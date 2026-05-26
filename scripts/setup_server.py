#!/usr/bin/env python3
"""
Minecraft Industrial Complex - Server Setup Script

Downloads all server mods and overrides from an mrpack file,
then installs the NeoForge server for the appropriate version.

Handles updates by detecting removed/outdated files and prompting
before destructive actions (delete, backup, or skip).

Usage:
    python scripts/setup_server.py [--mrpack <path>] [--output <dir>]
    python scripts/setup_server.py -y   (auto-accept all changes)
"""

import argparse
import hashlib
import json
import os
import shutil
import sys
import tempfile
import urllib.request
import zipfile
from pathlib import Path


def parse_args():
    parser = argparse.ArgumentParser(description="Setup a Minecraft server from an mrpack file")
    parser.add_argument(
        "--mrpack",
        default=None,
        help="Path to the .mrpack file (default: auto-detect latest in project root)",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Output directory for the server (default: ./server/)",
    )
    parser.add_argument(
        "--no-download",
        action="store_true",
        help="Skip downloading mods (only extract overrides and install server)",
    )
    parser.add_argument(
        "--no-server-install",
        action="store_true",
        help="Skip NeoForge server installer",
    )
    parser.add_argument(
        "-y", "--yes",
        action="store_true",
        help="Auto-accept all destructive changes (delete without prompting)",
    )
    return parser.parse_args()


def find_mrpack():
    root = Path(__file__).resolve().parent.parent
    candidates = sorted(root.glob("*.mrpack"))
    if not candidates:
        print("ERROR: No .mrpack files found. Specify one with --mrpack.")
        sys.exit(1)
    chosen = candidates[-1]
    print(f"Auto-detected mrpack: {chosen.name}")
    return str(chosen)


def sha512_file(path):
    h = hashlib.sha512()
    with open(path, "rb") as f:
        while True:
            chunk = f.read(8192)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()


def prompt_action(message, yes=False, default="k"):
    options = [
        ("d", "Delete / Overwrite"),
        ("b", "Backup"),
        ("k", "Keep (skip)"),
    ]

    print(f"\n{message}")
    parts = []
    for key, label in options:
        marker = key.upper() if key == default else key
        parts.append(f"[{marker}] {label}")
    print("  " + ", ".join(parts))

    if yes:
        chosen = "d"
        print(f"  Action: {chosen}  (-y flag)")
        return chosen

    while True:
        choice = input("  Action: ").strip().lower() or default
        if choice in ("d", "b", "k"):
            return choice
        print(f"  Invalid choice. Enter d, b, or k.")


def download_file(url, dest, expected_sha512=None):
    dest = Path(dest)
    if dest.exists():
        if expected_sha512 and sha512_file(str(dest)) == expected_sha512:
            print(f"  [hash ok] {dest.name}")
            return True
        print(f"  [hash mismatch, re-download] {dest.name}")

    print(f"  [download] {dest.name}")
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        urllib.request.urlretrieve(url, str(dest))
    except Exception as e:
        print(f"  [FAIL] {dest.name}: {e}")
        return False

    if expected_sha512:
        actual = sha512_file(str(dest))
        if actual != expected_sha512:
            print(f"  [hash verify FAIL] {dest.name}")
            dest.unlink()
            return False
        print(f"  [hash ok] {dest.name}")
    else:
        print(f"  [done] {dest.name}")
    return True


def download_neoforge(mc_version, neoforge_version, server_dir):
    installer_version = f"{neoforge_version}"
    installer_url = (
        f"https://maven.neoforged.net/releases/net/neoforged/neoforge/"
        f"{installer_version}/neoforge-{installer_version}-installer.jar"
    )
    installer_jar = server_dir / "neoforge-installer.jar"

    print(f"\nDownloading NeoForge server installer ({installer_version})...")
    if not download_file(installer_url, installer_jar):
        print("ERROR: Failed to download NeoForge installer")
        sys.exit(1)

    print("\nInstalling NeoForge server...")
    import subprocess
    result = subprocess.run(
        ["java", "-jar", str(installer_jar), "--installServer"],
        cwd=str(server_dir),
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"ERROR: NeoForge install failed:\n{result.stderr}")
        sys.exit(1)
    print(result.stdout)

    installer_jar.unlink()
    print("NeoForge server installed successfully.")


def cleanup_empty_parents(path, root):
    try:
        while path != root and path.exists() and not any(path.iterdir()):
            path.rmdir()
            path = path.parent
    except OSError:
        pass


def main():
    args = parse_args()

    mrpack_path = args.mrpack or find_mrpack()
    mrpack_path = Path(mrpack_path)
    if not mrpack_path.exists():
        print(f"ERROR: mrpack file not found: {mrpack_path}")
        sys.exit(1)

    server_dir = Path(args.output) if args.output else Path.cwd() / "server"
    server_dir.mkdir(parents=True, exist_ok=True)
    backup_dir = server_dir / ".backups"
    mods_dir = server_dir / "mods"
    manifest_path = server_dir / ".override-manifest.json"

    print(f"Reading mrpack: {mrpack_path}")
    with zipfile.ZipFile(str(mrpack_path), "r") as zf:
        with zf.open("modrinth.index.json") as f:
            index = json.load(f)

    mc_version = index["dependencies"]["minecraft"]
    neoforge_version = index["dependencies"].get("neoforge")
    print(f"Minecraft: {mc_version}")
    print(f"NeoForge:  {neoforge_version}")
    print(f"Mods in pack: {len(index['files'])}")

    # ── Build expected mod filenames ──────────────────────────────
    expected_mods = set()
    for entry in index["files"]:
        if entry.get("env", {}).get("server") != "unsupported":
            expected_mods.add(Path(entry["path"]).name)

    override_mod_names = set()
    with zipfile.ZipFile(str(mrpack_path), "r") as zf:
        for name in zf.namelist():
            if name.startswith("overrides/mods/") and not name.endswith("/"):
                override_mod_names.add(Path(name).name)
    expected_mods.update(override_mod_names)

    # ── Snapshot old mods before any changes ──────────────────────
    old_mods = set()
    if mods_dir.is_dir():
        old_mods = {f.name for f in mods_dir.iterdir() if f.suffix == ".jar" and not f.name.startswith(".")}

    # ── Load previous override manifest ───────────────────────────
    old_overrides = set()
    if manifest_path.exists():
        try:
            with open(manifest_path) as f:
                old_overrides = set(json.load(f))
        except (json.JSONDecodeError, OSError):
            pass

    # ── Collect new mrpack override paths ─────────────────────────
    new_overrides = set()
    with zipfile.ZipFile(str(mrpack_path), "r") as zf:
        for name in zf.namelist():
            if name.startswith("overrides/") and not name.endswith("/"):
                new_overrides.add(name[len("overrides/"):])

    # ── Prune removed mods ────────────────────────────────────────
    removed_mods = old_mods - expected_mods
    if removed_mods:
        print(f"\n{'='*60}")
        print(f"Mods removed from pack: {len(removed_mods)}")
        for mod_name in sorted(removed_mods):
            mod_path = mods_dir / mod_name
            if not mod_path.exists():
                continue
            action = prompt_action(
                f"Mod '{mod_name}' is no longer in the pack.",
                yes=args.yes,
            )
            if action == "d":
                mod_path.unlink()
                print(f"  deleted: {mod_name}")
            elif action == "b":
                (backup_dir / "mods").mkdir(parents=True, exist_ok=True)
                shutil.move(str(mod_path), str(backup_dir / "mods" / mod_name))
                print(f"  backed up: {mod_name}")
            elif action == "k":
                print(f"  kept: {mod_name}")

    # ── Prune removed override files ──────────────────────────────
    removed_overrides = old_overrides - new_overrides
    if removed_overrides:
        print(f"\n{'='*60}")
        print(f"Override files removed from pack: {len(removed_overrides)}")
        for rel_path in sorted(removed_overrides):
            file_path = server_dir / rel_path
            if not file_path.exists():
                continue
            action = prompt_action(
                f"Override '{rel_path}' is no longer in the pack.",
                yes=args.yes,
            )
            if action == "d":
                file_path.unlink()
                cleanup_empty_parents(file_path.parent, server_dir)
                print(f"  deleted: {rel_path}")
            elif action == "b":
                backup_target = backup_dir / "overrides" / rel_path
                backup_target.parent.mkdir(parents=True, exist_ok=True)
                shutil.move(str(file_path), str(backup_target))
                cleanup_empty_parents(file_path.parent, server_dir)
                print(f"  backed up: {rel_path}")
            elif action == "k":
                print(f"  kept: {rel_path}")

    # ── Download mods ─────────────────────────────────────────────
    if not args.no_download:
        server_files = [f for f in index["files"] if f.get("env", {}).get("server") != "unsupported"]
        print(f"\nDownloading {len(server_files)} server mods...")
        for entry in server_files:
            path = entry["path"]
            downloads = entry.get("downloads", [])
            expected_sha512 = entry.get("hashes", {}).get("sha512")
            if not downloads:
                print(f"  [no url] {path}")
                continue
            download_file(downloads[0], mods_dir / Path(path).name, expected_sha512)
        print(f"\nAll mods downloaded to: {mods_dir}")

    # ── Extract overrides with conflict detection ─────────────────
    print(f"\nExtracting overrides from mrpack...")
    extracted = 0
    skipped = 0
    with zipfile.ZipFile(str(mrpack_path), "r") as zf:
        for name in zf.namelist():
            if not name.startswith("overrides/") or name.endswith("/"):
                continue
            rel_path = name[len("overrides/"):]
            dest_path = server_dir / rel_path

            if dest_path.exists():
                existing_hash = sha512_file(str(dest_path))
                with tempfile.NamedTemporaryFile(delete=False) as tmp:
                    with zf.open(name) as src:
                        shutil.copyfileobj(src, tmp)
                    tmp_path = tmp.name
                new_hash = sha512_file(tmp_path)
                os.unlink(tmp_path)

                if existing_hash == new_hash:
                    skipped += 1
                    continue

                action = prompt_action(
                    f"Override '{rel_path}' differs from the local version.",
                    yes=args.yes,
                    default="k",
                )
                if action == "k":
                    skipped += 1
                    continue
                if action == "b":
                    backup_target = backup_dir / "overrides" / rel_path
                    backup_target.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(str(dest_path), str(backup_target))
                    print(f"  backed up original: {rel_path}")

            dest_path.parent.mkdir(parents=True, exist_ok=True)
            with zf.open(name) as src, open(str(dest_path), "wb") as dst:
                shutil.copyfileobj(src, dst)
            extracted += 1

    print(f"Extracted {extracted} override files (skipped {skipped} unchanged)")

    # ── Save new override manifest ────────────────────────────────
    with open(manifest_path, "w") as f:
        json.dump(sorted(new_overrides), f, indent=2)

    # ── (Optional) prune empty backup files ───────────────────────
    for empty_dir in sorted(
        [d for d in (backup_dir / "overrides").rglob("*") if d.is_dir() and not any(d.iterdir())],
        reverse=True,
    ):
        try:
            empty_dir.rmdir()
        except OSError:
            pass

    # ── NeoForge install ──────────────────────────────────────────
    if not args.no_server_install and neoforge_version:
        download_neoforge(mc_version, neoforge_version, server_dir)

    print(f"\n{'='*60}")
    print(f"Server setup complete!")
    print(f"Server directory: {server_dir}")
    if not args.no_server_install and neoforge_version:
        run_sh = server_dir / "run.sh"
        if run_sh.exists():
            print(f"To start: {run_sh}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()

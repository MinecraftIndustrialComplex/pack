#!/usr/bin/env python3
"""Garbage collection for the MIC pack's Rust build folders on this laptop.

Ben, 2026-10-21: "you & mcrtsim's rust builds are using ~200+Gb worth of disk space ... get a
decent garbage collection system up and running for you two and future agents in this pack".

What it collects: cargo `target/` folders (only folders holding cargo's CACHEDIR.TAG) inside the
git worktrees of every repo under the pack's mods/ folder, including agents' worktrees under
`<repo>/.claude/worktrees/`; and those agents' worktrees themselves once they are spent (rule 6).
Nothing else: no other source, no unmerged branch, no Gradle build.

Snapshots. /home is btrfs with hourly snapper snapshots kept up to about two weeks, so deleting
a plain target/ folder frees nothing until the last snapshot holding it expires. Snapshots stop
at nested subvolumes: every target/ this tool deletes comes back as an empty btrfs subvolume
(unprivileged `btrfs subvolume create`), so the next build lands outside the snapshots and its
deletion frees space at once. `subvol` converts a live tree's target now (a reflink copy, so its
cache stays warm). The report marks each target "subvol" or "snapshotted".

The rules, in order (a "tree" is one git worktree; its activity is the newest of its last build,
its last commit or checkout, its index and its top-level build/ folder's entries, where benches
keep their A/B builds):
  1. In use: never touched. A process has its cwd, executable or an open file inside the tree, or
     a cargo build lock under target/ is held.
  2. Active in the last ACTIVE_HOURS (6 h): never touched.
  3. A repo's main checkout (the Java GameTests load the natives from it): only its
     target/*/incremental goes, after INCREMENTAL_DAYS (2 d) idle or when over the budget.
  4. Merged into the repo's main branch with a clean working tree: target/ deleted.
  5. Otherwise (open branch or uncommitted work): target/*/incremental deleted after
     INCREMENTAL_DAYS idle; the whole target/ after TARGET_DAYS (7 d) idle. Then, if the targets
     still total more than --budget (default 100 GiB), the targets of trees idle BUDGET_IDLE_HOURS
     (24 h) go, least recently active first (a parked agent's tree survives a night), and the main
     checkouts' incremental caches.
  6. An agent's worktree (`<repo>/.claude/worktrees/agent-*`) that is merged, clean, not in use
     and idle WORKTREE_DAYS (3 d) is removed with `git worktree remove` (which refuses anything
     unclean) and its merged branch deleted with `git branch -d`. Its ignored files other than
     build outputs (review pages, screenshots, notes) are moved first to
     ~/.local/state/pack-gc/archive/<repo>/<worktree>/; one holding more than ARCHIVE_MAX_MIB of
     them is left in place and reported.
A target is first renamed (atomic; a cargo started afterwards makes a fresh one) and then deleted.

  pack-gc.py [--dry-run] [--budget GiB] [--root DIR]...   one pass (prints what it did)
  pack-gc.py report                                       sizes and verdicts, deletes nothing
  pack-gc.py subvol TREE...                               make TREE/target a subvolume now
  pack-gc.py install                                      daily user timer (systemd --user)

Runs: the daily timer, and every repo's merge step should call it after landing a branch.
Log: ~/.local/state/pack-gc/log. One pass at a time (flock on ~/.local/state/pack-gc/lock).
"""
from __future__ import annotations

import argparse
import fcntl
import os
import shutil
import subprocess
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path

PACK = Path(__file__).resolve().parents[3]  # .../Projects/mic
DEFAULT_ROOTS = [PACK / "mods"]
STATE = Path(os.environ.get("XDG_STATE_HOME", Path.home() / ".local/state")) / "pack-gc"
ACTIVE_HOURS = 6
INCREMENTAL_DAYS = 2
TARGET_DAYS = 7
BUDGET_IDLE_HOURS = 24
DEFAULT_BUDGET_GIB = 100
CACHEDIR_SIG = b"Signature: 8a477f597d28d172789f06886806bc55"
TRASH = ".pack-gc-trash"
WORKTREE_DAYS = 3
ARCHIVE_MAX_MIB = 512
BTRFS_SUBVOL_INO = 256  # every btrfs subvolume's root directory has this inode number


@dataclass
class Tree:
    path: Path
    repo: Path  # the repo's main checkout
    branch: str
    main_ref: str
    merged: bool = False
    dirty: bool = False
    is_main: bool = False
    target: Path | None = None
    subvol: bool = False
    target_bytes: int = 0
    incremental: list[Path] = field(default_factory=list)
    incremental_bytes: int = 0
    last_build: float = 0.0
    last_src: float = 0.0
    in_use: str = ""

    @property
    def last_active(self) -> float:
        return max(self.last_build, self.last_src)

    def label(self) -> str:
        flags = [self.branch] + [f for f, on in (("main checkout", self.is_main), ("merged", self.merged),
                                                 ("dirty", self.dirty)) if on]
        return f"{self.path} [{', '.join(flags)}]"


def git(cwd: Path, *args: str) -> str:
    r = subprocess.run(["git", "-C", str(cwd), *args], capture_output=True, text=True, timeout=60)
    return r.stdout.strip() if r.returncode == 0 else ""


def gib(n: float) -> str:
    return f"{n / 2**30:.1f} GiB"


def age(ts: float, now: float) -> str:
    if ts <= 0:
        return "never"
    h = max(0.0, now - ts) / 3600
    return f"{h:.0f} h" if h < 48 else f"{h / 24:.1f} d"


def disk_bytes(p: Path) -> int:
    """Allocated bytes under p (st_blocks: before compression; a reflinked extent counts in every
    file that holds it). An estimate: df before and after a pass is the truth."""
    total = 0
    stack = [p]
    while stack:
        d = stack.pop()
        try:
            with os.scandir(d) as it:
                for e in it:
                    try:
                        st = e.stat(follow_symlinks=False)
                    except OSError:
                        continue
                    total += st.st_blocks * 512
                    if e.is_dir(follow_symlinks=False):
                        stack.append(Path(e.path))
        except OSError:
            pass
    return total


def free_bytes(p: Path) -> int:
    st = os.statvfs(p)
    return st.f_bavail * st.f_frsize


def is_cargo_target(p: Path) -> bool:
    try:
        return (p / "CACHEDIR.TAG").read_bytes().startswith(CACHEDIR_SIG)
    except OSError:
        return False


def is_subvol(p: Path) -> bool:
    try:
        return p.stat().st_ino == BTRFS_SUBVOL_INO
    except OSError:
        return False


def on_btrfs(p: Path) -> bool:
    r = subprocess.run(["stat", "-f", "-c", "%T", str(p)], capture_output=True, text=True)
    return r.stdout.strip() == "btrfs"


def make_subvol(p: Path) -> bool:
    btrfs = shutil.which("btrfs") or "/run/current-system/sw/bin/btrfs"
    r = subprocess.run([btrfs, "subvolume", "create", str(p)], capture_output=True, text=True)
    return r.returncode == 0


def profile_dirs(target: Path) -> list[Path]:
    """target/<profile> and target/<triple>/<profile> folders (those holding .fingerprint)."""
    out = []
    for d in [target, *[c for c in target.iterdir() if c.is_dir()]]:
        try:
            for c in d.iterdir():
                if c.is_dir() and (c / ".fingerprint").is_dir():
                    out.append(c)
        except OSError:
            pass
    return out


def newest_mtime(paths: list[Path]) -> float:
    best = 0.0
    for p in paths:
        try:
            best = max(best, p.stat().st_mtime)
        except OSError:
            pass
    return best


def lock_held(lock: Path) -> bool:
    try:
        fd = os.open(lock, os.O_RDONLY)
    except OSError:
        return False
    try:
        fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
        fcntl.flock(fd, fcntl.LOCK_UN)
        return False
    except BlockingIOError:
        return True
    finally:
        os.close(fd)


def process_paths() -> list[tuple[str, str]]:
    """(pid and command name, path) for every cwd, executable and open file of this user's processes."""
    out = []
    me = os.getuid()
    for pid in os.listdir("/proc"):
        if not pid.isdigit() or pid == str(os.getpid()):
            continue
        base = f"/proc/{pid}"
        try:
            if os.stat(base).st_uid != me:
                continue
            name = Path(base, "comm").read_text().strip()
        except OSError:
            continue
        who = f"{pid} {name}"
        for link in ("cwd", "exe"):
            try:
                out.append((who, os.readlink(f"{base}/{link}")))
            except OSError:
                pass
        try:
            for fd in os.listdir(f"{base}/fd"):
                try:
                    out.append((who, os.readlink(f"{base}/fd/{fd}")))
                except OSError:
                    pass
        except OSError:
            pass
    return out


def find_trees(roots: list[Path]) -> list[Tree]:
    trees: dict[Path, Tree] = {}
    repos: set[Path] = set()
    for root in roots:
        if not root.is_dir():
            continue
        for d in sorted(root.iterdir()):
            if not (d / ".git").exists():
                continue
            common = git(d, "rev-parse", "--path-format=absolute", "--git-common-dir")
            if common:
                repos.add(Path(common).parent)
    for repo in sorted(repos):
        head = git(repo, "symbolic-ref", "--short", "refs/remotes/origin/HEAD")
        main_ref = head.split("/", 1)[1] if head else ""
        if not main_ref:
            for cand in ("main", "master"):
                if git(repo, "rev-parse", "--verify", "--quiet", f"refs/heads/{cand}"):
                    main_ref = cand
                    break
        if not main_ref:
            continue
        porcelain = git(repo, "worktree", "list", "--porcelain")
        for block in porcelain.split("\n\n"):
            fields = dict((line.split(" ", 1) + [""])[:2] for line in block.splitlines() if line)
            if "worktree" not in fields or "bare" in fields or "prunable" in fields:
                continue
            p = Path(fields["worktree"])
            if not p.is_dir() or p in trees:
                continue
            branch = fields.get("branch", "").removeprefix("refs/heads/") or "(detached)"
            trees[p] = Tree(path=p, repo=repo, branch=branch, main_ref=main_ref, is_main=(p == repo))
    return list(trees.values())


def inspect(t: Tree, trees: list[Tree], procs: list[tuple[str, str]], sizes: bool) -> None:
    prefix = str(t.path) + "/"
    nested = [str(o.path) + "/" for o in trees if o.path != t.path and str(o.path).startswith(prefix)]
    for who, p in procs:
        if (p + "/").startswith(prefix) and not any((p + "/").startswith(n) for n in nested):
            t.in_use = f"process {who}"
            break
    head = git(t.path, "rev-parse", "HEAD")
    if head:
        t.merged = subprocess.run(
            ["git", "-C", str(t.path), "merge-base", "--is-ancestor", head, t.main_ref],
            capture_output=True,
        ).returncode == 0
    t.dirty = bool(git(t.path, "status", "--porcelain", "--untracked-files=normal"))
    gitdir = Path(git(t.path, "rev-parse", "--path-format=absolute", "--git-dir") or t.path / ".git")
    build = t.path / "build"
    scratch = [build, *(c for c in build.iterdir() if c.is_dir())] if build.is_dir() else []
    t.last_src = newest_mtime([gitdir / "index", gitdir / "HEAD", gitdir / "logs" / "HEAD", *scratch])
    target = t.path / "target"
    if not is_cargo_target(target):
        return
    t.target = target
    t.subvol = is_subvol(target)
    marks = []
    for prof in profile_dirs(target):
        marks += [prof, prof / "deps", prof / ".fingerprint", prof / "build", prof / ".cargo-lock"]
        inc = prof / "incremental"
        if inc.is_dir():
            t.incremental.append(inc)
        if not t.in_use and lock_held(prof / ".cargo-lock"):
            t.in_use = f"cargo lock {prof.relative_to(t.path)}"
    t.last_build = newest_mtime(marks + [target])
    if sizes:
        t.target_bytes = disk_bytes(target)
        t.incremental_bytes = sum(disk_bytes(i) for i in t.incremental)


def remove(p: Path, dry: bool) -> None:
    if dry:
        return
    trash = p.with_name(f"{p.name}{TRASH}-{os.getpid()}-{int(time.time())}")
    os.rename(p, trash)
    shutil.rmtree(trash, ignore_errors=True)
    if trash.exists():  # an emptied subvolume whose rmdir failed (kernel before 4.18)
        subprocess.run([shutil.which("btrfs") or "btrfs", "subvolume", "delete", str(trash)], capture_output=True)


def drop_target(t: Tree, dry: bool) -> None:
    """Delete the tree's target/ and leave an empty subvolume in its place."""
    remove(t.target, dry)
    if not dry and on_btrfs(t.path) and not t.target.exists():
        make_subvol(t.target)


def convert(tree: Path, log) -> int:
    """`subvol`: make tree/target a subvolume, keeping its contents (reflink copy)."""
    target = tree / "target"
    if not on_btrfs(tree):
        log(f"{tree}: not on btrfs")
        return 1
    if is_subvol(target):
        log(f"{target}: already a subvolume")
        return 0
    if not target.exists():
        ok = make_subvol(target)
        log(f"{target}: {'created an empty subvolume' if ok else 'subvolume create failed'}")
        return 0 if ok else 1
    trees = find_trees([tree.parent]) or [Tree(path=tree, repo=tree, branch="", main_ref="")]
    t = next((x for x in trees if x.path == tree), Tree(path=tree, repo=tree, branch="", main_ref=""))
    inspect(t, trees, process_paths(), sizes=False)
    if t.in_use:
        log(f"{tree}: in use ({t.in_use}); stop its builds and try again")
        return 1
    new = tree / f"target{TRASH}-new-{os.getpid()}"
    if not make_subvol(new):
        log(f"{new}: subvolume create failed")
        return 1
    r = subprocess.run(["cp", "-a", "--reflink=always", f"{target}/.", f"{new}/"], capture_output=True, text=True)
    if r.returncode != 0:
        shutil.rmtree(new, ignore_errors=True)
        log(f"{tree}: reflink copy failed: {r.stderr.strip()[:200]}")
        return 1
    old = tree / f"target{TRASH}-old-{os.getpid()}"
    os.rename(target, old)
    os.rename(new, target)
    shutil.rmtree(old, ignore_errors=True)
    log(f"{target}: now a subvolume (contents kept)")
    return 0


def is_agent_worktree(t: Tree) -> bool:
    return t.path.name.startswith("agent-") and t.path.parent.name == "worktrees" and t.path.parent.parent.name == ".claude"


def regenerable(rel: str) -> bool:
    parts = rel.rstrip("/").split("/")
    for i, part in enumerate(parts):
        if part in ("target", ".gradle", "smoke", "run", "libs", "node_modules", "__pycache__", ".direnv"):
            return True
        if part.startswith(("run-", "result")):
            return True
        # A subproject's Gradle output; a top-level build/ holds agents' scratch scripts and notes.
        if part == "build" and i > 0:
            return True
    return False


def retire_worktree(t: Tree, dry: bool, log) -> None:
    """Rule 6: archive an idle merged agent worktree's ignored notes, then remove it."""
    r = subprocess.run(["git", "-C", str(t.path), "status", "--ignored", "--porcelain", "-z"],
                       capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        return
    keep = [e[3:] for e in r.stdout.split("\0") if e.startswith("!! ") and not regenerable(e[3:])]
    size = sum(disk_bytes(t.path / k) if (t.path / k).is_dir() else (t.path / k).lstat().st_blocks * 512
               for k in keep if (t.path / k).exists() or (t.path / k).is_symlink())
    if size > ARCHIVE_MAX_MIB * 2**20:
        log(f"leave  {t.label()}: spent, but {gib(size)} of ignored notes (over {ARCHIVE_MAX_MIB} MiB); look at it")
        return
    archive = STATE / "archive" / t.repo.name / t.path.name
    log(f"remove {t.label()}: spent agent worktree, idle {age(t.last_active, time.time())}"
        + (f"; {len(keep)} ignored paths ({gib(size)}) to {archive}" if keep else ""))
    if dry:
        return
    moved = []
    for k in keep:
        src, dst = t.path / k.rstrip("/"), archive / k.rstrip("/")
        dst.parent.mkdir(parents=True, exist_ok=True)
        os.rename(src, dst)
        moved.append((src, dst))
    rm = subprocess.run(["git", "-C", str(t.repo), "worktree", "remove", str(t.path)],
                        capture_output=True, text=True, timeout=600)
    if rm.returncode != 0:
        for src, dst in moved:
            os.rename(dst, src)
        log(f"  kept {t.path}: {rm.stderr.strip()[:200]}")
        return
    if t.branch not in ("(detached)", t.main_ref):
        subprocess.run(["git", "-C", str(t.repo), "branch", "-d", t.branch], capture_output=True, timeout=60)


def sweep_old_trash(trees: list[Tree], dry: bool, log) -> None:
    """Folders an interrupted pass renamed and did not finish deleting."""
    for t in trees:
        for p in [t.path, *[c for c in (t.path / "target").glob("*") if c.is_dir()]]:
            try:
                for c in p.iterdir():
                    if TRASH in c.name and c.is_dir():
                        log(f"leftover {c}: deleted")
                        if not dry:
                            remove(c, False)
            except OSError:
                pass


def run(args) -> int:
    now = time.time()
    roots = [Path(r).resolve() for r in (args.root or DEFAULT_ROOTS)]
    STATE.mkdir(parents=True, exist_ok=True)
    lines: list[str] = []

    def log(msg: str) -> None:
        lines.append(msg)
        print(msg, flush=True)

    lock = open(STATE / "lock", "w")
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        print("pack-gc: another pass is running", file=sys.stderr)
        return 0
    trees = find_trees(roots)
    procs = process_paths()
    for t in trees:
        inspect(t, trees, procs, sizes=True)
    report = args.cmd == "report"
    dry = args.dry_run or report
    mode = "report" if report else ("dry run" if dry else "pass")
    df0 = free_bytes(roots[0])
    log(f"== pack-gc {mode} {time.strftime('%Y-%m-%d %H:%M:%S')} roots={','.join(map(str, roots))} free={gib(df0)}")
    if not report:
        sweep_old_trash(trees, dry, log)
    before = sum(t.target_bytes for t in trees)
    freed = {True: 0, False: 0}  # by whether the target was a subvolume (freed at once) or not

    def gone(t: Tree, n: int) -> None:
        freed[t.subvol] += n

    left: list[Tree] = []
    for t in sorted(trees, key=lambda t: -t.target_bytes):
        if t.target is None:
            continue
        idle_h = (now - t.last_active) / 3600
        info = f"{gib(t.target_bytes)} {'subvol' if t.subvol else 'snapshotted'}, active {age(t.last_active, now)} ago"
        if t.in_use:
            log(f"keep   {t.label()}: {info}; in use ({t.in_use})")
            continue
        if idle_h < ACTIVE_HOURS:
            log(f"keep   {t.label()}: {info}; active")
            continue
        if not t.is_main and t.merged and not t.dirty:
            log(f"delete {t.label()}: {info}; merged and clean")
            drop_target(t, dry)
            gone(t, t.target_bytes)
            continue
        if not t.is_main and idle_h >= TARGET_DAYS * 24:
            log(f"delete {t.label()}: {info}; idle over {TARGET_DAYS} d")
            drop_target(t, dry)
            gone(t, t.target_bytes)
            continue
        if idle_h >= INCREMENTAL_DAYS * 24 and t.incremental_bytes:
            log(f"trim   {t.label()}: {info}; incremental {gib(t.incremental_bytes)} (idle over {INCREMENTAL_DAYS} d)")
            for inc in t.incremental:
                remove(inc, dry)
            gone(t, t.incremental_bytes)
            t.target_bytes -= t.incremental_bytes
            t.incremental_bytes = 0
        else:
            log(f"keep   {t.label()}: {info}")
        left.append(t)
    budget = args.budget * 2**30
    total = before - sum(freed.values())
    if total > budget:
        log(f"over budget: {gib(total)} > {gib(budget)}")
        for t in sorted(left, key=lambda t: (t.is_main, t.last_active)):
            if total <= budget:
                break
            if t.is_main:
                if not t.incremental_bytes:
                    continue
                log(f"trim   {t.label()}: incremental {gib(t.incremental_bytes)}; budget")
                for inc in t.incremental:
                    remove(inc, dry)
                n = t.incremental_bytes
            elif now - t.last_active < BUDGET_IDLE_HOURS * 3600:
                continue
            else:
                log(f"delete {t.label()}: {gib(t.target_bytes)}, active {age(t.last_active, now)} ago; budget")
                drop_target(t, dry)
                n = t.target_bytes
            gone(t, n)
            total -= n
        if total > budget:
            log(f"still over budget ({gib(total)}): the rest is in use, active in the last "
                f"{BUDGET_IDLE_HOURS} h or a main checkout")
    verb = "would free" if dry else "freed"
    log(f"targets {gib(before)} -> {gib(total)}: {verb} {gib(freed[True])} at once (subvolumes) and "
        f"{gib(freed[False])} as the snapshots holding it expire (plain folders)")
    spent = [t for t in trees if is_agent_worktree(t) and t.merged and not t.dirty and not t.in_use
             and now - t.last_active >= WORKTREE_DAYS * 86400]
    for t in sorted(spent, key=lambda t: t.last_active):
        retire_worktree(t, dry, log)
    if spent:
        log(f"agent worktrees: {len(spent)} spent of {sum(map(is_agent_worktree, trees))}")
    if not dry:
        log(f"free space {gib(df0)} -> {gib(free_bytes(roots[0]))}")
    if not report:
        with open(STATE / "log", "a") as f:
            f.write("\n".join(lines) + "\n")
    return 0


UNIT = """[Unit]
Description=MIC pack: garbage-collect Rust build folders (pack/tools/gc/pack-gc.py)

[Service]
Type=oneshot
Nice=19
IOSchedulingClass=idle
Environment=PATH={path}
ExecStart={python} {script}
"""
TIMER = """[Unit]
Description=MIC pack: daily Rust build garbage collection

[Timer]
OnCalendar=*-*-* 04:30:00
Persistent=true

[Install]
WantedBy=timers.target
"""


def install(_args) -> int:
    d = Path.home() / ".config/systemd/user"
    d.mkdir(parents=True, exist_ok=True)
    path = ":".join(p for p in [str(Path(shutil.which("git") or "/run/current-system/sw/bin/git").parent),
                                "/run/current-system/sw/bin", os.environ.get("PATH", "")] if p)
    (d / "pack-gc.service").write_text(UNIT.format(path=path, python=sys.executable, script=Path(__file__).resolve()))
    (d / "pack-gc.timer").write_text(TIMER)
    subprocess.run(["systemctl", "--user", "daemon-reload"], check=True)
    subprocess.run(["systemctl", "--user", "enable", "--now", "pack-gc.timer"], check=True)
    subprocess.run(["systemctl", "--user", "list-timers", "pack-gc.timer", "--no-pager"])
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("cmd", nargs="?", default="run", choices=["run", "report", "subvol", "install"])
    ap.add_argument("trees", nargs="*", help="subvol: the worktrees whose target/ to convert")
    ap.add_argument("--dry-run", action="store_true", help="say what would go, delete nothing")
    ap.add_argument("--budget", type=float, default=DEFAULT_BUDGET_GIB, help="GiB for all targets together")
    ap.add_argument("--root", action="append", help="folder whose git repos are scanned (default: the pack's mods/)")
    args = ap.parse_args()
    if args.cmd == "install":
        return install(args)
    if args.cmd == "subvol":
        return max((convert(Path(t).resolve(), print) for t in args.trees), default=0)
    return run(args)


if __name__ == "__main__":
    sys.exit(main())

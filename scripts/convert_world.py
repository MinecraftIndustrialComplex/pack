#!/usr/bin/env python3
"""
Minecraft world block/item converter — replaces block/item IDs in region files.

Patching palette entries (Name fields) in region file NBT — safe for 1.18+.

Usage:
    pip install anvil-parser
    python scripts/convert_world.py saves/MyWorld --config replacements.json

Config JSON format (see default-config.json for a reference):
    {
        "blocks": {
            "createnuclear:uranium_ore": "minecraft:stone",
            "createnuclear:deepslate_uranium_ore": "minecraft:deepslate"
        },
        "items": {
            "createnuclear:uranium_rod": "minecraft:stick"
        }
    }
"""

import json
import os
import sys
from pathlib import Path


def patch_palette(section_dict, blocks):
    """Replace block IDs in a section's block_state palette. Returns True if changed."""
    block_states = section_dict.get("block_states")
    if not block_states:
        return False
    palette = block_states.get("palette", [])
    changed = False
    for entry in palette:
        name = entry.get("Name", "")
        if name in blocks:
            entry["Name"] = blocks[name]
            changed = True
    return changed


def patch_nbt(obj, blocks, items):
    """Recursively replace item/block IDs in NBT-like dicts/lists."""
    changed = False
    if isinstance(obj, dict):
        for key in ("id", "Name", "item", "block"):
            val = obj.get(key)
            if isinstance(val, str):
                if val in blocks:
                    obj[key] = blocks[val]
                    changed = True
                elif val in items:
                    obj[key] = items[val]
                    changed = True
        for v in obj.values():
            if isinstance(v, (dict, list)):
                changed = patch_nbt(v, blocks, items) or changed
    elif isinstance(obj, list):
        for item in obj:
            if isinstance(item, (dict, list)):
                changed = patch_nbt(item, blocks, items) or changed
    return changed


def process_region_file(rpath, blocks, items):
    from anvil_parser import Region

    try:
        region = Region(rpath)
    except Exception as e:
        print(f"    Skipping (error: {e})")
        return False

    modified = False
    for cx in range(32):
        for cz in range(32):
            try:
                chunk = region.get_chunk(cx, cz)
            except Exception:
                continue
            chunk_mod = False

            for section in chunk.get("sections", []):
                if patch_palette(section, blocks):
                    chunk_mod = True

            for key in ("block_entities", "entities", "TileEntities",
                        "block_ticks", "fluid_ticks"):
                for entry in chunk.get(key, []):
                    if patch_nbt(entry, blocks, items):
                        chunk_mod = True

            if chunk_mod:
                region.set_chunk(cx, cz, chunk)
                modified = True

    if modified:
        region.save()
    return modified


def main():
    if len(sys.argv) < 2:
        print("Usage: python convert_world.py <world_directory> [--config config.json]")
        print("Example: python convert_world.py saves/MyWorld --config replacements.json")
        sys.exit(1)

    world_dir = Path(sys.argv[1])
    if not world_dir.is_dir():
        print(f"Error: {world_dir} is not a directory")
        sys.exit(1)

    config_path = None
    if "--config" in sys.argv:
        idx = sys.argv.index("--config")
        if idx + 1 < len(sys.argv):
            config_path = Path(sys.argv[idx + 1])

    blocks = {}
    items = {}
    if config_path:
        if not config_path.is_file():
            print(f"Error: config file {config_path} not found")
            sys.exit(1)
        with open(config_path) as f:
            config = json.load(f)
        blocks.update(config.get("blocks", {}))
        items.update(config.get("items", {}))
    else:
        print("No --config provided, searching for default-config.json ...")
        script_dir = Path(__file__).parent
        default = script_dir / "default-config.json"
        if default.is_file():
            with open(default) as f:
                config = json.load(f)
            blocks.update(config.get("blocks", {}))
            items.update(config.get("items", {}))
        else:
            print("No config file found. Use --config to specify one.")
            sys.exit(1)

    search_dirs = [
        ("region", "overworld"),
        ("DIM-1/region", "nether"),
        ("DIM1/region", "end"),
        ("entities", "overworld_entities"),
        ("DIM-1/entities", "nether_entities"),
        ("DIM1/entities", "end_entities"),
    ]

    total_files = 0
    modified_files = 0

    for subdir, label in search_dirs:
        d = world_dir / subdir
        if not d.is_dir():
            continue
        mca_files = sorted(d.glob("*.mca"))
        if not mca_files:
            continue
        print(f"\n[{label}] ({len(mca_files)} files)")
        for f in mca_files:
            total_files += 1
            sys.stdout.write(f"  {f.name} ... ")
            sys.stdout.flush()
            if process_region_file(f, blocks, items):
                modified_files += 1
                print("modified")
            else:
                print("no changes")

    print(f"\nDone. {modified_files}/{total_files} region files contained target blocks.")


if __name__ == "__main__":
    main()

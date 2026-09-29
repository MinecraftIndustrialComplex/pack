# The `deep-time` pack branch

What this branch adds on top of pack master for the Deep Time mod, and why. Ben's rule (Deep Time
decisions log, 2026-09-28): every pack change for Deep Time stays on this branch, never on master.
Deep Time's own jar is not on the branch yet.

This file sits under `modDocs/`, which `.packwizignore` excludes, so it never ships. It is
force-added to git (`modDocs/` is otherwise gitignored).

## What is on the branch

| Change | Files | Why |
|---|---|---|
| Excavated Variants 4.3.1 + Dynamic Asset Generator 6.1.2 (NeoForge 1.21.1, Modrinth `krUiU6UD` / `U0ft2n2p`, LGPL-3.0-or-later) | `mods/excavated_variants.pw.toml`, `mods/dynamic_asset_generator.pw.toml` | Q10, "Keep EV, fill its gaps": Deep Time places EV's ore-in-this-rock blocks when EV is installed. These are the pins the Q10 comparison used. EV bundles DefaultResources 3.6.0 (jar-in-jar). |
| EV stone configs: Born in Chaos black argillite, fired black argillite | `globalresources/mic/globaldata/excavated_variants/excavated_variants/stone/born_in_chaos_v1/*.json` | Black argillite is MIC's rock for coal, shale, black shale, slate and phyllite, and fired argillite is its hornfels. EV had no stone for either, so ore in them stayed plain stone ore. |
| EV ore configs: Create Nuclear lead, Ice and Fire silver | `globalresources/mic/…/ore/createnuclear/lead_ore.json`, `…/ore/iceandfire/silver_ore.json` | EV ships lead and silver configs only for other mods (Embers, IE, …). These give MIC's lead and silver variants in every EV stone. |
| Almost Unified: hide the new variants | `config/almostunified/unification/materials.json` | See "Almost Unified" below. |
| Deep Time rock tags (plan Q16) | `kubejs/data/deeptime/` (120 tag files) | A copy of `mic/Docs/datapacks/deeptime-mic-rock-tags/data/deeptime/`. KubeJS loads it into every world. |

### How the EV configs load

EV reads its configs through DefaultResources, which treats every folder or zip in
`<game dir>/globalresources/` as a pack and reads `globaldata/<namespace>/…` from it. The branch
ships `globalresources/mic/` as a plain folder through packwiz (side `both`). A config for a block
whose mod is absent is inert, because EV's `required_mods` defaults to the block's namespace.

Schema (EV 4.3.1, from `api/data/Stone` and `api/data/Ore` codecs):

- stone: `{"types": ["excavated_variants:overworld"], "translations": {"en_us": …}, "block": <id>,
  "ore_tags": [<tag>…]}`, id `excavated_variants:<ns>/<name>`.
- ore: `{"types": […], "translations": {…}, "blocks": {<ore block>: <stone id> | {"stone": …,
  "generating": true, "required_mods": […]}}, "tags": [<tag>…]}`. `generating` marks the ore block
  EV builds each variant from (the stone one, as in EV's vanilla configs; EV's mappings cache names
  `createnuclear:lead_ore` / `iceandfire:silver_ore` as the source).
  The lead config also carries `createnuclear:lead_ores`, the tag Create Nuclear's own recipes use,
  so the variants count in them.

### Almost Unified

This branch first carried AU's generated default plus three EV entries, because AU 1.4.2 reads only
`config/almostunified/unification/*.json` and master's `unify.json` (0.x layout) was never read.
The AU port for master (`au-port-steel-guard`, 5041f8e: the port, a steel guard against KubeJS's
recipe cleanup, entries for absent mods pruned, Create Addon Compatibility's injected entries written
out) is merged into this branch. `unify.json` is deleted; `unification/materials.json`,
`placeholders.json` and `tags.json` are new. The EV entries were reconciled against the port:

- `c:ores/lead → createnuclear`: in the port already (it came from `unify.json`). Nothing added.
- `c:ores/coal`: the port's `placeholders.json` lists `coal` as a `{material}`, so `c:ores/{material}`
  already yields it. Nothing added.
- `c:ores/silver → iceandfire`: not in the port and no priority mod owns silver. Added to
  `priority_overrides`; it is the only line this branch's `materials.json` has beyond the port.

The copycat tags, `c:ingots/plastic` and the pneumaticcraft/copycats/create_connected/create_dd/tfmg
priorities that this branch used to carry from a generated file are in the port too: Create Addon
Compatibility appends them in memory on a dedicated server only, so the port writes them out and
singleplayer gets them as well.

## Verification (2026-09-29, on the Mac)

Recipe: the Q10 comparison's (Deep Time repo `tools/review/q10-ev.sh`). Preset
`deposits_world_16k.json` (every-class strata), 500 Myr, level seed 7, first-start generation,
Chunky squares at −5582,−1022 r112 and −16,−2144 r80. Two servers from one Deep Time jar
(Deep Time master 84759b0):

- **plain**: pack master 303fd89 (168 jars), with the rock tags as a world datapack;
- **branch**: this branch (170 jars), with the rock tags from `kubejs/data/deeptime/` only.

Both passed every smoke check (boot, generation before Done, all mixins applied, **every rock class
resolves**, sites, claims, restart without regeneration). EV registers **252** generated variants
(Q10: 190): 22 per overworld ore config, including **22 lead and 22 silver**, and 11 ores each in
black argillite and fired black argillite. Neither log has an EV, DAG or DefaultResources error
or warning, other than EV's usual mixin compatibility-level notices. The ERROR count differs by 2,
both from Create Jetpack's config-reload race (`Cannot send clientbound payloads on the client`),
which is unrelated.

Deep Time's own ore (claimed materials), the same three boxes as Q10, position by position between
the two worlds (`deeptime-inspect ore-hosts --other`):

| | Q10 (EV, no gap configs) | this branch |
|---|---|---|
| ore blocks | 2,506 | 2,507 |
| an EV variant | 1,350 | **2,291** |
| unchanged | 1,156 | **216** |
| black argillite (ore / variant) | 483 / 0 | **549 / 549** |
| fired black argillite | 390 / 0 | **395 / 395** |
| silver | 3 / 0 | 3 / 2 |

The argillite rows rose because hosts in the branch world are now exact (EV's own stone) rather
than estimated. What stays plain is ore in hosts EV has no stone for: stone 168 (its variant *is*
the original), dirt 12, obsidian 10, coarse dirt 6, deepslate 6, grass 1.

**Lead and silver.** The Q10 boxes have no Zn–Pb deposit, so a second boot of both worlds added
Chunky squares over MVT sites 23/24 (1625,−844 r32) and SEDEX site 25 (5063,401 r48). In those two
boxes, **lead 262 / 262** are variants (240 in black argillite at the SEDEX, 22 in Create asurine at
the MVT) and **silver 46 / 46** (43 in black argillite, 3 in asurine). Zinc 3,176 / 3,176, and
4,732 of 4,739 claimed-ore blocks overall.

**Almost Unified** on the branch hides variants in 10 ore tags: coal, copper, diamond, emerald,
gold, iron, lapis, **lead**, **silver** and zinc (19 of 24 items each, 24 of 30 for gold). AU keeps
one item per stone stratum.

Re-measured after merging the AU candidate (`au-port-steel-guard`, 2026-09-29, a plain dedicated boot of
the pack without the Deep Time jar, on the Mac, AU debug dumps on; the counts above are from the Deep Time
world, these from the boot-time lookup): the same 10 ore tags hide the same EV variants as the
generated-default file did (15 of 20 entries in nine tags, 20 of 26 in gold; lead, silver and coal
included), 0 AU errors, and the pack installs from the merged index with `unify.json` removed. A boot with
Create Addon Compatibility's mixin switched off (a singleplayer view) unifies exactly what the server boot
does.

Not checked here: textures. DAG paints EV's textures on the client. Q10's `ev-assets` client run
covered only EV's own and Deep Time's stones, so the argillite, lead and silver sprites have not
been looked at yet.

## Known pack issues not touched here

A stale index hash for `kubejs/server_scripts/destroy_metallurgy_integration.js`; Ritchie's
Projectile Library pinned twice; three index-listed raw jars that `.gitignore` keeps out of git
(Destroy, Dice, Playing Cards). The index was edited by hand (entries added, and the AU entries
re-hashed) rather than with `packwiz refresh`.

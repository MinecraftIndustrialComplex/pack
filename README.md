# Minecraft Industrial Complex
Advanced create based modpack which has an extremely difficult early game, with a create based progression system that results in modern industrial tooling (guns, tanks, etc.) used to conquer this difficult world.
# TODO
- Redo legendary survival overhaul progression
- Check tank / plane / etc. building is decent.
- Initial cobblemon create integration
- Bosses
  - Natural Boss Spawning
  - Remove items & progression from boss mods: l ender cataclysm, legendary monsteres, meet your fight, mowzies mobs, bosses of mass destruction
  - Cataclysm: Make everything spawn without a structure
  - Mowzies mobs: Natty spawns
  - Legendary Monsters without structures
- Diesel Generator / Destroy Integration
- Decent Weapon Crafting
- Kaiju
- Horde attacks
  - Maybe configure it a bit better?
- Exposure destroy integration
- Space?
- Makes bosses spawn in hordes???
- Add in a system for getting guns
- Destroy powergrid integration
- Boss raid system
- Make comutercraft recipes cool
- Electric Heater
- Powergrid battery uses destroy acid, and lead.
- Waterframe reasonable crafting
- Null Cataclysms recipes
- Re-work simple radio crafting tree

# Installation:
- Add in magic jar: https://github.com/Petrolpark-Mods/Destroy/pull/775

## 1.21 Migration
The following `packwiz update --all` failures were moved to `disabledMods/`:
- Flint'N'Powder - Guns, Cultists, Reloads!
- Game Stages
- Ice and Fire
- Legendary Monsters
- Lexiconfig
- Meet Your Fight
- Petrolpark (Destroy dependency, 1.20.1 jar)
- Simple Create Radios
- Simple Radio
- SmallDice
- Veinminer
- CC:Destroy Bridge
- Create: Radars
- Destroy (1.20.1 jar)

### KubeJS scripts currently broken or migration-blocked
These scripts reference removed mods/content and need follow-up before a clean 1.21 release:

- `kubejs/server_scripts/tacz_new_recipes.js` - depends on `tacz` and `destroy` content that is currently removed. Script is now guard-wrapped and inactive until those mods return.
- `kubejs/server_scripts/taczfreeze.js` - depends on `tacz` workbench blocks that are currently removed. Script is now guard-wrapped and inactive.
- `kubejs/server_scripts/flintnpowder.js` - depends on `flintnpowder` items currently removed. Script is now guard-wrapped and inactive.
- `kubejs/client_scripts/flintnpowderprune.js` - hides `flintnpowder` items in JEI, but mod is removed. Script is now guard-wrapped and inactive.
- `kubejs/server_scripts/iceandfire.js` - targets `iceandfire` recipes/loot tables, but mod is removed. Script is now guard-wrapped and inactive.
- `kubejs/server_scripts/oilyunification.js` - still references `destroy` items (`destroy:seismometer`, `destroy:pumpjack`) and should be rewritten or removed for Destroy-free progression.
- `kubejs/client_scripts/oilyunification.js` - still hides `destroy` items in JEI and should be rewritten or removed for Destroy-free progression.

Related data files that still include Destroy fluids and may need a migration cleanup pass:
- `kubejs/data/forge/tags/fluids/crude_oil.json`
- `kubejs/data/forge/tags/fluids/diesel.json`
- `kubejs/data/forge/tags/fluids/gasoline.json`
- `kubejs/data/createdieselgenerators/tags/fluids/pumpjack_output.json`
Additional 1.21 runtime crash blocker moved to `disabledMods/`:
- Create: Vintage NeoForged (title screen render crash in `OpenVintageMenuButton`, NullPointerException)
- Create: Tweaked Controllers (title screen render crash in `ModMainConfigButton`, NullPointerException)


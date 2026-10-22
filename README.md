![Minecraft Industrial Complex](./logo.png)
Advanced create based modpack which has an extremely difficult early game, with a create based progression system that results in modern industrial tooling (guns, tanks, etc.) used to conquer this difficult world.
Makes heavy use of aeronautics, tacz, create, powergrid.

# Core Mods:
- Create
- Create Aeronautics to enable creation of military vehicles.
- Overgeared and Create Metallurgy to provide better early game progression and metal working.
- Destroy to provide for more engaging crafting recipes
- Powergrid to provide power management and transmisison systems.
- Cobblemon as I am yet to find an engineer who does not like pokemon.
- Timeless and Classic Zero to provide responsive weapons
- Ice and Fire, as well as various other boss mods to provide something to shoot

# TODO
- Kaiju
- Space?
- Boss raid system
- Null Cataclysms recipes
- Sophisticated Backpacks: re-visit Everlasting and Inception upgrade crafting (recipes removed for now)
- Aerogel
- Bosses
  - Natural Boss Spawning
  - Remove items & progression from boss mods: l ender cataclysm, legendary monsteres, meet your fight, mowzies mobs, bosses of mass destruction
  - Cataclysm: Make everything spawn without a structure
  - Mowzies mobs: Natty spawns
- Actually good gun crafting system
- Fix gold simplebackpacks removing backpack.
- Add mineral oil and baby oil
- Add in leaded gasoline
- Migrate petrochem system to a mod to fix jank

# Installation:
- Grab simple radio jars from their discord.
- Compile the destroy-mic fork of destroy and add the jar

# Running a server:
- `python scripts/setup_server.py` extracts an `.mrpack` and installs the NeoForge server (`-y` accepts every prompt).
- It also sets the heap in `user_jvm_args.txt` to `-Xms8G -Xmx8G`. Use `--heap 12G` for a different size, or `--no-heap` to leave the file alone. It never lowers a larger `-Xmx` you already have and keeps your other JVM args.
- Give big Create worlds at least 8 GB, with `-Xms` equal to `-Xmx`. At `-Xmx6G` the live heap sits near G1's marking threshold and background GC costs 10 to 16 ms of CPU per tick.

# Do not bring a 1.19.2 world:
- Do not upgrade a Create world from 1.19.2 to this pack. Items inside modded block entities do not survive. Copycats, toolboxes, deployers and chutes come back with count 1 and no components, and a deployer or chute holding more than one item keeps one.
- Create 6 also zeroes the old station, signal and curve positions, so trains lose their stations.
- This is Minecraft's and Create's behaviour, not the pack's. Start a new world.
- If you must migrate anyway, work on a copy and run `tools/stress-worlds/remap_tracks.py --positions-only` from the mic-rtsim repository (`mods/mic-rtsim`) before the world's first Create 6 load. It fixes the positions only. It does not bring back item data.

# Credits:
- Huge thanks to NHBlock for developing the ![1.21.1 fork of destroy](https://github.com/NHblock714/Destroy/tree/1.21.1-neo)

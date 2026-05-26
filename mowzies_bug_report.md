# Server watchdog timeout caused by WroughtnautChamberStructure.tryWroughtChamber()

**Minecraft version:** 1.21.1 (NeoForge 21.1.230)
**Mowzie's Mobs version:** 1.8.2
**Mod loaders involved:** NeoForge + Sinytra Connector (Fabric API via connector)

## Summary

The server hangs indefinitely (~100% reproducible) when attempting to generate a Wroughtnaut Chamber structure. The `tryWroughtChamber()` method at `WroughtnautChamberStructure.java:81` calls `getBaseColumn()`, which triggers a full `NoiseChunk` initialization. This results in an extremely deep `CubicSpline.equals()` recursion through the entire world density function tree, saturating the chunk worker thread for over 60 seconds and deadlocking the server.

## Crash signature

All 4 crash reports show the exact same pattern:

```
c2me-worker-* RUNNABLE:
  Upgrading chunk [79, -51] to minecraft:structure_starts
    -> WroughtnautChamberStructure.tryWroughtChamber(line 81)
      -> NoiseBasedChunkGenerator.getBaseColumn()
        -> NoiseChunk.<init>
          -> NoiseRouter.mapAll()
            -> DensityFunctions$Spline$mapAll()  (deep recursion)
              -> CubicSpline.equals()
                -> Object2ObjectOpenHashMap.get()

Server thread + DH-World Gen Thread both BLOCKED on:
  Sync load chunk [81, -56] to minecraft:structure_references
```

The `tryWroughtChamber()` at line 81 calls `getBaseColumn()` which samples the noise column for terrain height checks. This forces the noise system to build and compare the full density function graph via `mapAll()`, which recursively enters `CubicSpline.equals()` → `ImmutableCollections$ListItr.next()` in a tight loop that can take over a minute to complete on a 4-core machine.

## How to reproduce

1. Install Mowzie's Mobs 1.8.2 on Minecraft 1.21.1 (NeoForge)
2. Have C2ME and Distant Horizons installed (the issue is amplified by concurrent worldgen but the root is the expensive `getBaseColumn()` call)
3. Load a world where a Wroughtnaut Chamber is being generated around chunk `[79, -51]`
4. The server will watchdog within ~1 minute

The crash is deterministic — it hits the same chunks every time on world reload.

## Impact

The server becomes completely unresponsive. The watchdog thread detects a single tick taking >60,000 seconds and terminates the server. This affects any modpack using Mowzie's Mobs with concurrent worldgen mods.

## Suggested fix

The `tryWroughtChamber()` method in `WroughtnautChamberStructure.java` should avoid calling `getBaseColumn()` during structure piece generation, or should use a lighter-weight terrain check that doesn't force full `NoiseChunk` initialization. Calling `ChunkAccess.getHeight()` on already-loaded sections would be far cheaper than invoking the noise pipeline from scratch.

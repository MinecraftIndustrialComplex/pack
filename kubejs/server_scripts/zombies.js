// --- CONFIGS ---
const RAID_CHANCE = 0.10;
const BASE_LEVEL_BOOST = 5;
const MAX_LEVEL_BOOST = 10;
const SPAWN_RADIUS = 25;

// --- DYNAMIC SCALING CONFIGS ---
const DIFFICULTY_FLOOR = 0.1;    // The absolute minimum difficulty
const KILL_DIFF_INCREASE = 0.01; // Increase per zombie kill
const DEATH_PENALTY_MULT = 10.0; // Penalty = CurrentDiff * 10 * KILL_DIFF_INCREASE
const QUANTITY_MULTIPLIER = 2.0; 
const LEVEL_SCALING_FACTOR = 5.0; 

// --- SPAWN LOGIC ---
EntityEvents.spawned('minecraft:zombie', event => {
    const { entity, level } = event;
    let nearestPlayer = level.getNearestPlayer(entity.x, entity.y, entity.z, 64, false);
    
    // Ensure we respect the 0.1 floor even for natural spawns
    let pData = nearestPlayer ? nearestPlayer.persistentData : null;
    let diffScore = (pData && pData.raidDifficultyScore >= DIFFICULTY_FLOOR) ? pData.raidDifficultyScore : 1.0;
    
    let currentLevel = entity.nbt.getInt("l2hostility:level") || 0;
    let dynamicBoost = Math.floor(Math.random() * (MAX_LEVEL_BOOST - BASE_LEVEL_BOOST + 1)) + (diffScore * LEVEL_SCALING_FACTOR);
    
    entity.mergeNbt({ "l2hostility:level": Math.floor(currentLevel + dynamicBoost) });

    // Nighttime double spawns
    if (level.isNight() && !entity.tags.contains('extra_spawn')) {
        if (Math.random() < 0.5) { 
            let e = level.createEntity('minecraft:zombie');
            e.setPosition(entity.x, entity.y, entity.z);
            e.addTag('extra_spawn');
            e.spawn();
        }
    }
});

// --- RAID TICKER ---
LevelEvents.tick(event => {
    const { level, server } = event;
    
    // Use dayTime % 24000 to catch the start of night reliably
    if (level.dayTime % 24000 == 13000) {
        server.players.forEach(p => {
            if (Math.random() < RAID_CHANCE) {
                p.tell(Text.red('The air grows cold... A zombie raid has begun!'));
                p.persistentData.isRaidActive = true;
            }
        });
    }

    if (level.dayTime % 24000 == 0) {
        server.players.forEach(p => {
            if (p.persistentData.isRaidActive) {
                p.persistentData.isRaidActive = false;
                p.tell(Text.green('The horde retreats with the sunrise.'));
            }
        });
    }
    
    if (level.time % 100 == 0 && level.isNight()) {
        server.players.forEach(p => {
            if (p.persistentData.isRaidActive) {
                let diff = p.persistentData.raidDifficultyScore || 1.0;
                if (diff < DIFFICULTY_FLOOR) diff = DIFFICULTY_FLOOR;

                let count = Math.floor(diff * QUANTITY_MULTIPLIER);
                if (count < 1 && diff >= DIFFICULTY_FLOOR) count = 1; 
                
                for (let i = 0; i < count; i++) {
                    let offsetX = (Math.random() - 0.5) * (SPAWN_RADIUS * 2);
                    let offsetZ = (Math.random() - 0.5) * (SPAWN_RADIUS * 2);
                    let spawnX = Math.floor(p.x + offsetX);
                    let spawnZ = Math.floor(p.z + offsetZ);
                    
                    let spawnY = level.getHeight('motion_blocking', spawnX, spawnZ);
                    
                    // FIXED: Using .air property and direct coordinate access
                    let block = level.getBlock(spawnX, spawnY, spawnZ);
                    let groundBlock = level.getBlock(spawnX, spawnY - 1, spawnZ);
                    
                    if (spawnY > level.minBuildHeight && block.air && !groundBlock.liquid) {
                        let zombie = level.createEntity('minecraft:zombie');
                        zombie.setPosition(spawnX, spawnY, spawnZ);
                        zombie.addTag('raid_zombie');
                        zombie.spawn();
                    }
                }
            }
        });
    }
});

// --- REAL-TIME DIFFICULTY SCALING ---
EntityEvents.death(event => {
    const { entity, source } = event;

    if (entity.isPlayer()) {
        let currentDiff = entity.persistentData.raidDifficultyScore || 1.0;
        let penalty = currentDiff * DEATH_PENALTY_MULT * KILL_DIFF_INCREASE;
        
        let newDiff = Math.max(DIFFICULTY_FLOOR, currentDiff - penalty);
        entity.persistentData.raidDifficultyScore = newDiff;
        
        entity.tell(Text.italic().gray(`Difficulty decreased to ${newDiff.toFixed(2)}`));
    }

    if (entity.type == 'minecraft:zombie' && entity.tags.contains('raid_zombie')) {
        if (source.actual && source.actual.isPlayer()) {
            let p = source.actual;
            let currentDiff = p.persistentData.raidDifficultyScore || 1.0;
            if (currentDiff < DIFFICULTY_FLOOR) currentDiff = DIFFICULTY_FLOOR;

            p.persistentData.raidDifficultyScore = currentDiff + KILL_DIFF_INCREASE;
        }
    }
});

// --- COMMANDS ---
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Args } = event;

    event.register(Commands.literal('startraid')
        .requires(s => s.hasPermission(2))
        .executes(c => {
            let p = c.source.player;
            if (p) {
                p.persistentData.isRaidActive = true;
                p.tell('Raid started.');
                return 1;
            }
            return 0;
        })
    );

    event.register(Commands.literal('getdifficulty')
        .requires(s => s.hasPermission(2))
        .executes(c => {
            let p = c.source.player;
            if (p) {
                let score = p.persistentData.raidDifficultyScore || 1.0;
                p.tell(`Current Difficulty: ${score.toFixed(2)}`);
                return 1;
            }
            return 0;
        })
    );

    event.register(Commands.literal('setdifficulty')
        .requires(s => s.hasPermission(2))
        .then(Commands.argument('val', Args.FLOAT.create(event))
            .executes(c => {
                let p = c.source.player;
                if (p) {
                    let v = Args.FLOAT.getResult(c, 'val');
                    p.persistentData.raidDifficultyScore = Math.max(DIFFICULTY_FLOOR, v);
                    p.tell(`Difficulty set to ${p.persistentData.raidDifficultyScore}`);
                    return 1;
                }
                return 0;
            })
        )
    );
});

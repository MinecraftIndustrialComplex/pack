ServerEvents.recipes(e => {
  const pokeballs = [
    // Standard balls
    'cobblemon:poke_ball',
    'cobblemon:great_ball',
    'cobblemon:ultra_ball',
    'cobblemon:dive_ball',
    'cobblemon:dusk_ball',
    'cobblemon:heal_ball',
    'cobblemon:net_ball',
    'cobblemon:nest_ball',
    'cobblemon:quick_ball',
    'cobblemon:repeat_ball',
    'cobblemon:timer_ball',
    'cobblemon:luxury_ball',
    'cobblemon:premier_ball',
    'cobblemon:dream_ball',
    'cobblemon:beast_ball',
    'cobblemon:safari_ball',
    'cobblemon:sport_ball',
    'cobblemon:park_ball',
    'cobblemon:master_ball',

    // Base colored balls
    'cobblemon:azure_ball',
    'cobblemon:citrine_ball',
    'cobblemon:roseate_ball',
    'cobblemon:slate_ball',
    'cobblemon:verdant_ball',

    // Apricorn balls
    'cobblemon:fast_ball',
    'cobblemon:friend_ball',
    'cobblemon:heavy_ball',
    'cobblemon:level_ball',
    'cobblemon:love_ball',
    'cobblemon:lure_ball',
    'cobblemon:moon_ball',

    // Ancient balls
    'cobblemon:ancient_azure_ball',
    'cobblemon:ancient_citrine_ball',
    'cobblemon:ancient_feather_ball',
    'cobblemon:ancient_gigaton_ball',
    'cobblemon:ancient_great_ball',
    'cobblemon:ancient_heavy_ball',
    'cobblemon:ancient_ivory_ball',
    'cobblemon:ancient_jet_ball',
    'cobblemon:ancient_leaden_ball',
    'cobblemon:ancient_poke_ball',
    'cobblemon:ancient_roseate_ball',
    'cobblemon:ancient_slate_ball',
    'cobblemon:ancient_ultra_ball',
    'cobblemon:ancient_verdant_ball',
    'cobblemon:ancient_wing_ball',
  ]
  pokeballs.forEach(id => e.remove({ output: id, id: /^cobblemon:/ }))
})

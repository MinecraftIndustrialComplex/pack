if (Platform.isLoaded('sophisticatedbackpacks')) {
  ServerEvents.recipes(e => {
    const goldSheet = '#c:plates/gold'
    const ironSheet = '#c:plates/iron'
    const steelIngot = '#c:ingots/steel'

    const replaceOutputs = [
      'sophisticatedbackpacks:upgrade_base',
      'sophisticatedbackpacks:magnet_upgrade',
      'sophisticatedbackpacks:advanced_magnet_upgrade',
      'sophisticatedbackpacks:restock_upgrade',
      'sophisticatedbackpacks:advanced_restock_upgrade',
      'sophisticatedbackpacks:tank_upgrade',
      'sophisticatedbackpacks:pump_upgrade',
      'sophisticatedbackpacks:advanced_pump_upgrade',
      'sophisticatedbackpacks:gold_backpack',
      'sophisticatedbackpacks:diamond_backpack',
      'sophisticatedbackpacks:advanced_pickup_upgrade',
      'sophisticatedbackpacks:advanced_void_upgrade',
      'sophisticatedbackpacks:advanced_filter_upgrade',
      'sophisticatedbackpacks:advanced_deposit_upgrade',
      'sophisticatedbackpacks:advanced_feeding_upgrade',
      'sophisticatedbackpacks:advanced_refill_upgrade',
      'sophisticatedbackpacks:advanced_alchemy_upgrade',
      'sophisticatedbackpacks:advanced_compacting_upgrade',
      'sophisticatedbackpacks:advanced_jukebox_upgrade',
      'sophisticatedbackpacks:advanced_tool_swapper_upgrade',
      'sophisticatedbackpacks:battery_upgrade',
      'sophisticatedbackpacks:everlasting_upgrade',
      'sophisticatedbackpacks:inception_upgrade'
    ]
    replaceOutputs.forEach(id => e.remove({ output: id }))

    e.shaped('sophisticatedbackpacks:upgrade_base', [
      'SIS',
      'ILI',
      'SIS'
    ], {
      S: 'minecraft:string',
      I: ironSheet,
      L: 'minecraft:leather'
    }).id('kubejs:sophisticated_backpacks/upgrade_base')

    e.shaped('sophisticatedbackpacks:magnet_upgrade', [
      'EME',
      'MPM',
      'RL '
    ], {
      E: 'minecraft:ender_pearl',
      M: 'powergrid:magnet',
      P: 'sophisticatedbackpacks:pickup_upgrade',
      R: 'minecraft:redstone',
      L: 'minecraft:lapis_lazuli'
    }).id('kubejs:sophisticated_backpacks/magnet_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_magnet_upgrade', [
      'EME',
      'MPM',
      'RL '
    ], {
      E: 'minecraft:ender_pearl',
      M: 'powergrid:magnet',
      P: 'sophisticatedbackpacks:advanced_pickup_upgrade',
      R: 'minecraft:redstone',
      L: 'minecraft:lapis_lazuli'
    }).id('kubejs:sophisticated_backpacks/advanced_magnet_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_magnet_upgrade', [
      'D D',
      'GMG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      M: 'sophisticatedbackpacks:magnet_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_magnet_from_basic')

    e.shaped('sophisticatedbackpacks:restock_upgrade', [
      ' S ',
      'IBI',
      'RCR'
    ], {
      S: 'create:stock_link',
      I: '#c:ingots/iron',
      B: 'sophisticatedbackpacks:upgrade_base',
      R: 'minecraft:redstone',
      C: '#c:chests/wooden'
    }).id('kubejs:sophisticated_backpacks/restock_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_restock_upgrade', [
      'D D',
      'GVG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      V: 'sophisticatedbackpacks:restock_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_restock_upgrade')

    e.shaped('sophisticatedbackpacks:tank_upgrade', [
      'GGG',
      'GBG',
      'GGG'
    ], {
      G: 'create:fluid_tank',
      B: 'sophisticatedbackpacks:upgrade_base'
    }).id('kubejs:sophisticated_backpacks/tank_upgrade')

    e.shaped('sophisticatedbackpacks:pump_upgrade', [
      'GUG',
      'PBS',
      'GUG'
    ], {
      G: 'create:fluid_tank',
      U: 'minecraft:bucket',
      P: 'create:mechanical_pump',
      B: 'sophisticatedbackpacks:upgrade_base',
      S: 'create:mechanical_pump'
    }).id('kubejs:sophisticated_backpacks/pump_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_pump_upgrade', [
      'DID',
      'GPG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      I: 'minecraft:dispenser',
      G: goldSheet,
      P: 'sophisticatedbackpacks:pump_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_pump_upgrade')

    e.shaped('sophisticatedbackpacks:battery_upgrade', [
      'GPG',
      'PUP',
      'GPG'
    ], {
      G: goldSheet,
      P: 'powergrid:battery',
      U: 'sophisticatedbackpacks:upgrade_base'
    }).id('kubejs:sophisticated_backpacks/battery_upgrade')

    e.shaped('sophisticatedbackpacks:gold_backpack', [
      'SGS',
      'GBG',
      'SGS'
    ], {
      S: steelIngot,
      G: '#c:ingots/gold',
      B: 'sophisticatedbackpacks:iron_backpack'
    }).id('kubejs:sophisticated_backpacks/gold_backpack')

    e.custom({
      type: 'minecraft:smithing_transform',
      template: { item: 'overgeared:diamond_upgrade_smithing_template' },
      base: { item: 'sophisticatedbackpacks:gold_backpack' },
      addition: { item: 'minecraft:diamond' },
      result: { id: 'sophisticatedbackpacks:diamond_backpack', count: 1 }
    }).id('kubejs:sophisticated_backpacks/diamond_backpack')

    e.shaped('sophisticatedbackpacks:advanced_pickup_upgrade', [
      'D D',
      'GPG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      P: 'sophisticatedbackpacks:pickup_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_pickup_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_void_upgrade', [
      'D D',
      'GVG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      V: 'sophisticatedbackpacks:void_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_void_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_filter_upgrade', [
      'GPG',
      'RRR'
    ], {
      G: goldSheet,
      P: 'sophisticatedbackpacks:filter_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_filter_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_deposit_upgrade', [
      'D D',
      'GVG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      V: 'sophisticatedbackpacks:deposit_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_deposit_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_feeding_upgrade', [
      'D D',
      'GVG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      V: 'sophisticatedbackpacks:feeding_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_feeding_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_refill_upgrade', [
      'D D',
      'GFG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      F: 'sophisticatedbackpacks:refill_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_refill_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_alchemy_upgrade', [
      'D D',
      'GAG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      A: 'sophisticatedbackpacks:alchemy_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_alchemy_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_compacting_upgrade', [
      'D D',
      'GCG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      C: 'sophisticatedbackpacks:compacting_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_compacting_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_jukebox_upgrade', [
      'D D',
      'GJG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      J: 'sophisticatedbackpacks:jukebox_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_jukebox_upgrade')

    e.shaped('sophisticatedbackpacks:advanced_tool_swapper_upgrade', [
      'D D',
      'GVG',
      'RRR'
    ], {
      D: 'minecraft:diamond',
      G: goldSheet,
      V: 'sophisticatedbackpacks:tool_swapper_upgrade',
      R: 'minecraft:redstone'
    }).id('kubejs:sophisticated_backpacks/advanced_tool_swapper_upgrade')

    // Everlasting / Inception: crafting disabled until progression recipes are designed
  })
}

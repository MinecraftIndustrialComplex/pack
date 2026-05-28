if (Platform.isLoaded('tacz')) {
ServerEvents.recipes(event => {

  const removeItems = [
    'tacz:gun_smith_table',
    'tacz:workbench_a',
    'tacz:workbench_c',
  ];
  removeItems.forEach(id => {
    try { event.remove({ output: id }) } catch (ex) {}
  });

  try { event.remove({ type: 'tacz:gun_smith_table_crafting' }) } catch (ex) {}

  event.custom({
    type: 'create:mechanical_crafting',
    pattern: [
      'SPPS',
      'ACBA',
      'SWWS',
      'SWWS'
    ],
    key: {
      S: { tag: 'c:plates/steel' },
      P: { tag: 'c:storage_blocks/steel' },
      A: { item: 'minecraft:anvil' },
      C: { item: 'create:precision_mechanism' },
      B: { tag: 'c:plates/brass' },
      W: { tag: 'minecraft:planks' }
    },
    result: { id: 'tacz:gun_smith_table', count: 1 }
  }).id('kubejs:tacz/workbench/gun_smith_table')

  event.custom({
    type: 'create:mechanical_crafting',
    pattern: [
      'SPS',
      'MCM',
      'DPD',
      'WWW'
    ],
    key: {
      S: { tag: 'c:plates/steel' },
      P: { tag: 'c:storage_blocks/steel' },
      M: { item: 'create:precision_mechanism' },
      C: { item: 'create:deployer' },
      D: { item: 'create:mechanical_piston' },
      W: { tag: 'minecraft:planks' }
    },
    result: { id: 'tacz:workbench_a', count: 1 }
  }).id('kubejs:tacz/workbench/attachment_workbench')

  event.custom({
    type: 'create:mechanical_crafting',
    pattern: [
      'SPS',
      'MCM',
      'FPF',
      'WWW'
    ],
    key: {
      S: { tag: 'c:plates/steel' },
      P: { tag: 'c:storage_blocks/steel' },
      M: { item: 'create:precision_mechanism' },
      C: { item: 'create:mechanical_pump' },
      F: { item: 'create:fluid_pipe' },
      W: { tag: 'minecraft:planks' }
    },
    result: { id: 'tacz:workbench_c', count: 1 }
  }).id('kubejs:tacz/workbench/ammo_workbench')

})}

ServerEvents.recipes(e => {
  const removeRecipes = [
    'overgeared:alloy_furnace',
    'overgeared:nether_alloy_furnace',
    'overgeared:crude_steel_from_alloying',
    'overgeared:crude_steel_from_nether_alloying',
    'overgeared:steel_ingot_from_cooling',
    'overgeared:casting_furnace',
    'overgeared:clay_tool_cast',
    'overgeared:fired_tool_cast',
    'overgeared:fired_tool_cast_blasting'
  ];
  
  removeRecipes.forEach(id => e.remove({ id: id }));
  
  e.remove({ output: 'overgeared:steel_ingot' });
  e.remove({ output: 'overgeared:crude_steel' });

  // Duplicate steel ingots — createmetallurgy:steel_ingot is canonical
  e.remove({ output: 'createbigcannons:steel_ingot' });
  e.remove({ output: 'createnuclear:steel_ingot' });
  e.remove({ output: 'overgeared:unfired_tool_cast' });
  e.remove({ output: 'overgeared:clay_tool_cast' });
  e.remove({ output: 'overgeared:nether_tool_cast' });
  e.remove({ output: 'overgeared:alloy_furnace' });
  e.remove({ output: 'overgeared:nether_alloy_furnace' });
  e.remove({ output: 'overgeared:casting_furnace' });

  e.remove({ type: 'overgeared:casting' });
  e.remove({ type: 'overgeared:cast_smelting' });
  e.remove({ type: 'overgeared:cast_blasting' });

  const molds = {
    'axe': 270,
    'pickaxe': 270,
    'shovel': 90,
    'hoe': 180,
    'sword': 180,
    'hammer': 180
  };

  const materials = {
    'copper': { fluid: 'createmetallurgy:molten_copper', prefix: 'overgeared:copper_' },
    'iron': { fluid: 'createmetallurgy:molten_iron', prefix: 'minecraft:iron_' },
    'golden': { fluid: 'createmetallurgy:molten_gold', prefix: 'minecraft:golden_' },
    'steel': { fluid: 'createmetallurgy:molten_steel', prefix: 'overgeared:steel_' }
  };

  Object.keys(molds).forEach(mold => {
    e.stonecutting(`kubejs:graphite_${mold}_mold`, 'createmetallurgy:graphite_blank_mold');
  });

  Object.entries(materials).forEach(([mat, data]) => {
    Object.entries(molds).forEach(([mold, amount]) => {
      let headItem = `overgeared:${mat}_${mold === 'sword' ? 'sword_blade' : mold + '_head'}`;
      
      if (mat === 'golden' && mold === 'hammer') return;
      if (mat === 'iron' && mold === 'hammer') return;
      
      e.recipes.createmetallurgy.casting_in_table(headItem, [
        Fluid.of(data.fluid, amount),
        `kubejs:graphite_${mold}_mold`
      ])
      .processingTime(amount / 3)
      .id(`kubejs:casting_${mat}_${mold}`);
    });
  });

  // // Melting integration (disabled)
  // Object.entries(materials).forEach(([mat, data]) => {
  //   Object.entries(molds).forEach(([mold, amount]) => {
  //     let headItem = `overgeared:${mat}_${mold === 'sword' ? 'sword_blade' : mold + '_head'}`;
  //     if (mat === 'golden' && mold === 'hammer') return;
  //     if (mat === 'iron' && mold === 'hammer') return;
  //
  //     e.recipes.createmetallurgy.melting(Fluid.of(data.fluid, amount), headItem)
  //     .processingTime(amount / 3)
  //     .heated()
  //     .id(`kubejs:melting_${mat}_${mold}_head`);
  //   });
  // });
  //
  // // Melting down full tools
  // Object.entries(materials).forEach(([mat, data]) => {
  //   Object.entries(molds).forEach(([mold, amount]) => {
  //     let toolItem = `${data.prefix}${mold}`;
  //     if (mold === 'hammer') {
  //         toolItem = mat === 'steel' ? 'overgeared:smithing_hammer' : `overgeared:${mat}_smithing_hammer`;
  //     }
  //     
  //     if (mat === 'golden' && mold === 'hammer') return;
  //     if (mat === 'iron' && mold === 'hammer') return;
  //
  //     e.recipes.createmetallurgy.melting(Fluid.of(data.fluid, amount), toolItem)
  //     .processingTime(amount / 3)
  //     .heated()
  //     .id(`kubejs:melting_${mat}_${mold}_tool`);
  //   });
  // });
  //
  // // Armor melting (disabled)

  e.custom({
    type: "create:mechanical_crafting",
    pattern: [
      "DDDDD",
      "DDDDD",
      "DDSDD",
      "DDDDD",
      "DDDDD"
    ],
    key: {
      "D": { item: "minecraft:diamond" },
      "S": { tag: "c:ingots/steel" }
    },
    result: {
      id: "overgeared:diamond_upgrade_smithing_template",
      count: 1
    },
    acceptMirrored: false
  }).id(`kubejs:mechanical_crafting_diamond_upgrade_template`);
});

ServerEvents.recipes(e => {
  // ----------------------------
  // Remove steel items / recipes
  // ----------------------------
  const removeItems = [
	 "overgeared:steel_ingot"
  ];
  removeItems.forEach(id => e.remove({ output: id }));

  // ----------------------------
  // Replace Overgeared smithing: steel->diamond  ==> iron->diamond
  // ----------------------------
  // const TEMPLATE = 'overgeared:diamond_upgrade_smithing_template'; // change if needed
  // const ADDITION = 'minecraft:diamond';
  //
  // const DIAMOND_GEAR = /^minecraft:diamond_(helmet|chestplate|leggings|boots|sword|pickaxe|axe|shovel|hoe)$/;
  //
  // // remove old template-based diamond upgrade recipes
  // e.remove({ type: 'minecraft:smithing_transform', input: TEMPLATE, output: DIAMOND_GEAR });
  //
  // // add iron -> diamond upgrades
  // const parts = ['helmet','chestplate','leggings','boots','sword','pickaxe','axe','shovel','hoe'];
  //
  // parts.forEach(p => {
  //   e.custom({
  //     type: 'minecraft:smithing_transform',
  //     template: { item: TEMPLATE },
  //     base: { item: `minecraft:iron_${p}` },
  //     addition: { item: ADDITION },
  //     result: { item: `minecraft:diamond_${p}` }
  //   }).id(`kubejs:overgeared/iron_to_diamond_${p}`);
  // });
  //
  // // ----------------------------
  // // NEW: Template duplication recipe (makes 2)
  // // DTD / DID / DDD
  // // ----------------------------
  // e.shaped(Item.of(TEMPLATE, 2), [
  //   'DTD',
  //   'DID',
  //   'DDD'
  // ], {
  //   D: 'minecraft:diamond',
  //   T: TEMPLATE,
  //   I: 'minecraft:iron_ingot'
  // }).id('kubejs:overgeared/diamond_template_duplication');
});

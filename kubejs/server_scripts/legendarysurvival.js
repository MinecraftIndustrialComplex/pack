ServerEvents.recipes(e => {
  const removeItems = [
	  "legendarysurvivaloverhaul:heart_container"
  ];
  removeItems.forEach(id => e.remove({ output: id }));

  // Large canteen — use Destroy rigid plastic + ancient debris
  e.remove({ output: 'legendarysurvivaloverhaul:large_canteen_empty' });
  e.shaped('legendarysurvivaloverhaul:large_canteen_empty', [
    ' A ',
    'P P',
    'PPP'
  ], {
    P: '#destroy:plastics/rigid',
    A: 'minecraft:ancient_debris'
  }).id('kubejs:lso/large_canteen_empty');
});

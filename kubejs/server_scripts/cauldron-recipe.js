ServerEvents.recipes(e => {
  e.shaped('minecraft:cauldron', [
    'I I',
    'I I',
    'III'
  ], {
    I: 'minecraft:iron_ingot'
  }).id('kubejs:cauldron_recipe')
})
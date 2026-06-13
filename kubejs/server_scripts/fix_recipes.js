// Recipes which somehow got removed from the game, which should be in it.
ServerEvents.recipes(e => {
  e.shapeless('9x create:copper_nugget', ['minecraft:copper_ingot'])
    .id('kubejs:copper_ingot_to_nugget')
})
ServerEvents.recipes(e => {
  e.shaped('minecraft:cauldron', [
    'I I',
    'I I',
    'III'
  ], {
    I: 'minecraft:iron_ingot'
  }).id('kubejs:cauldron_recipe')
})
ServerEvents.recipes(e => {
  e.shaped('minecraft:bucket', [
    '   ',
    'I I',
    ' I '
  ], {
    I: 'minecraft:iron_ingot'
  }).id('kubejs:bucket_recipe')
})

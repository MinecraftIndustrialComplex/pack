ServerEvents.recipes(event => {
  event.remove({ output: 'create:electron_tube' })
  event.shapeless('create:electron_tube', ['create:polished_rose_quartz', '#c:plates/steel'])
  event.recipes.create.deploying('create:electron_tube', [Ingredient.of('#c:plates/steel'), 'create:polished_rose_quartz'])

// Prevent softlock from not being able to obtain powdered obsidian
  event.recipes.create.milling([
    CreateItem.of('create:powdered_obsidian', 0.5)
  ], 'minecraft:obsidian')
})

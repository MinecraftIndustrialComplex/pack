ServerEvents.recipes(event => {
  event.remove({ output: 'create:electron_tube' })
  event.shapeless('create:electron_tube', ['create:polished_rose_quartz', '#c:plates/steel'])
  event.recipes.create.deploying('create:electron_tube', [Ingredient.of('#c:plates/steel'), 'create:polished_rose_quartz'])
})

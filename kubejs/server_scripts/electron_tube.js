ServerEvents.recipes(event => {
  // Remove existing electron tube recipes
  event.remove({ output: 'create:electron_tube' })
  
  // Add new crafting recipe
  event.shapeless('create:electron_tube', ['create:polished_rose_quartz', '#c:plates/steel'])
  
  // Add new deploying recipe (Steel Sheet + Polished Rose Quartz)
  event.recipes.create.deploying('create:electron_tube', ['#c:plates/steel', 'create:polished_rose_quartz'])
})

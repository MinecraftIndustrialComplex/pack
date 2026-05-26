ServerEvents.recipes(e => {
  e.remove({ output: 'minecraft:flint_and_steel' })
  e.shapeless('minecraft:flint_and_steel', ['minecraft:flint', 'minecraft:iron_ingot'])
})

ServerEvents.recipes(event => {
  event.remove({ mod: 'iceandfire' })
})
LootJS.modifiers(event => {
  event.addLootTableModifier(/iceandfire:.*/)
    .removeLoot(/.*/)
})

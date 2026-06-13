if (Platform.isLoaded('l2complements')) {
  ServerEvents.recipes(event => {
    event.remove({ mod: 'l2complements' })
  })

  LootJS.modifiers(event => {
    event.addTableModifier(/^l2complements:.+/).removeLoot(/.*/)
  })
}
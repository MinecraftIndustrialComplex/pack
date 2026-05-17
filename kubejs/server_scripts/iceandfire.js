if (Platform.isLoaded('iceandfire')) {
  ServerEvents.recipes(event => {
    event.remove({ mod: 'iceandfire' })
  })
  LootJS.modifiers(event => {
    event.addTableModifier(/iceandfire:.*/)
      .removeLoot(/.*/)
  })
}

if (Platform.isLoaded('iceandfire')) {
  ServerEvents.recipes(event => {
    event.remove({ mod: 'iceandfire' })
  })
  LootJS.modifiers(event => {
    const BOSSES = ['fire_dragon', 'ice_dragon', 'lightning_dragon', 'hydra', 'cyclops', 'gorgon']
    event.addTableModifier(new RegExp('iceandfire:(?!(.*/)?(' + BOSSES.join('|') + ')$).*'))
      .removeLoot(/.*/)
  })
}

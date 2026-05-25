if (!Platform.isLoaded('morejs')) {
  console.warn('[kubejs] disable_villager_trading.js: MoreJS is not loaded; those professions are unchanged.')
} else {
  MoreJS.villagerTrades(event => {
    const REMOVED_PROFESSIONS = [
      'minecraft:armorer',
      'minecraft:librarian',
      'minecraft:toolsmith',
      'minecraft:weaponsmith',
    ]
    const LEVELS = [1, 5]
    event.removeVanillaTypedTrades(REMOVED_PROFESSIONS, LEVELS)
    event.removeModdedTypedTrades(REMOVED_PROFESSIONS, LEVELS)
  })

  console.info('[kubejs] Removed armorer, librarian, toolsmith, and weaponsmith villager trades.')
}

LootJS.modifiers(event => {
  // Target loot tables
  const targets = [
    /minecraft:chests\/shipwreck_.*/,     // shipwreck_supply, shipwreck_map, shipwreck_treasure
    "minecraft:chests/buried_treasure",   // “treasure chest”
    /minecraft:chests\/village\/.*/,      // all village chests (incl. armorer/toolsmith/weaponsmith/etc.)
  ]

  // Tags/items to remove (edit to taste)
  const tagFilters = [
    "#c:ores",
    "#c:raw_materials",
    "#c:ingots",
    "#c:nuggets",
    "#c:gems",
    "#c:storage_blocks",

    // some packs still use forge: tags
    "#forge:ores",
    "#forge:raw_materials",
    "#forge:ingots",
    "#forge:nuggets",
    "#forge:gems",
    "#forge:storage_blocks",
  ]

  // Vanilla fallbacks (in case a pack’s tags are weird/incomplete)
  const itemFilters = [
    "minecraft:diamond",
    "minecraft:diamond_block",
    "minecraft:raw_iron",
    "minecraft:raw_gold",
    "minecraft:raw_copper",
    "minecraft:iron_ingot",
    "minecraft:gold_ingot",
    "minecraft:copper_ingot",
    "minecraft:iron_nugget",
    "minecraft:gold_nugget",
    // If by “bars” you literally meant iron bars:
    // "minecraft:iron_bars",
  ]

  const removeFilter = ItemFilter.anyOf(
    ...tagFilters.map(t => ItemFilter.tag(t)),
    ...itemFilters.map(i => ItemFilter.item(i))
  )

  targets.forEach(t => {
    event.addTableModifier(t).removeLoot(removeFilter)
  })
})

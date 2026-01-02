LootJS.modifiers(function (event) {
  var targets = [
    /minecraft:chests\/shipwreck_.*/,
    "minecraft:chests/buried_treasure",
    /minecraft:chests\/village\/.*/
  ];

  var tagFilters = [
    "#c:ores",
    "#c:raw_materials",
    "#c:ingots",
    "#c:nuggets",
    "#c:gems",
    "#c:storage_blocks",
    "#forge:ores",
    "#forge:raw_materials",
    "#forge:ingots",
    "#forge:nuggets",
    "#forge:gems",
    "#forge:storage_blocks"
  ];

  var itemFilters = [
    "minecraft:diamond",
    "minecraft:diamond_block"
  ];

  for (var t = 0; t < targets.length; t++) {
    var mod = event.addLootTableModifier(targets[t]);

    for (var i = 0; i < tagFilters.length; i++) {
      mod.removeLoot(tagFilters[i]);
    }

    for (var j = 0; j < itemFilters.length; j++) {
      mod.removeLoot(itemFilters[j]);
    }
  }
});

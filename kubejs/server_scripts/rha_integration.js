if (Platform.isLoaded('rha')) {
ServerEvents.recipes(event => {
  const RHA_FAMILIES = {
    hardsteel:    ['_4bo', 'algae', 'ardenne', 'azure', 'blush', 'cactus', 'camel', 'charcoal', 'cherenkov', 'coral', 'desert', 'dust', 'garupan', 'gelb', 'gink', 'gorge', 'gravel', 'grizzly', 'hide', 'horizon', 'jet', 'kampfgrau', 'kat', 'ley', 'olive', 'panzergrau', 'parade', 'patton', 'pine', 'rota', 'scale', 'sensha', 'snow', 'type'],
    slashedsteel: ['_4bo', 'algae', 'ardenne', 'azure', 'blush', 'cactus', 'camel', 'charcoal', 'cherenkov', 'coral', 'desert', 'dust', 'garupan', 'gelb', 'gink', 'gold', 'gorge', 'gravel', 'grizzly', 'hide', 'horizon', 'jet', 'kampfgrau', 'kat', 'ley', 'notex', 'olive', 'panzergrau', 'parade', 'patton', 'pine', 'rota', 'scale', 'sensha', 'snow', 'type'],
    rivetedsteel: ['_4bo', 'algae', 'ardenne', 'azure', 'blush', 'cactus', 'camel', 'charcoal', 'cherenkov', 'coral', 'desert', 'dust', 'garupan', 'gelb', 'gink', 'gorge', 'gravel', 'grizzly', 'hide', 'horizon', 'jet', 'kampfgrau', 'kat', 'ley', 'olive', 'panzergrau', 'parade', 'patton', 'pine', 'rota', 'scale', 'sensha', 'snow', 'type'],
    layeredsteel: ['_4bo', 'algae', 'ardenne', 'azure', 'blush', 'cactus', 'camel', 'charcoal', 'cherenkov', 'coral', 'desert', 'dust', 'garupan', 'gelb', 'gink', 'gorge', 'gravel', 'grizzly', 'hide', 'horizon', 'jet', 'kampfgrau', 'kat', 'ley', 'olive', 'panzergrau', 'parade', 'patton', 'pine', 'rota', 'scale', 'sensha', 'snow', 'type']
  }

  event.remove({ mod: 'rha' })
  Object.entries(RHA_FAMILIES).forEach(([family, colors]) => {
    event.remove({ output: 'rha:' + family + 'slate' })
    colors.forEach(suffix => event.remove({ output: 'rha:' + family + suffix }))
  })

  // Tier 0: Sandbags
  event.remove({ type: 'minecraft:stonecutting', output: 'rha:sandbagtan' })
  event.remove({ type: 'minecraft:stonecutting', output: 'rha:sandbaggreen' })

  event.shaped('4x rha:sandbagtan', [
    'PSP',
    'SPS',
    'PSP'
  ], {
    'P': 'minecraft:paper',
    'S': '#minecraft:smelts_to_glass'
  }).id('kubejs:rha/sandbagtan')

  event.shapeless('rha:sandbaggreen', ['rha:sandbagtan', 'minecraft:green_dye'])
    .id('kubejs:rha/sandbaggreen')

  // Tier 1a: Hardsteel — rolled armor (press steel blocks into plates)
  event.custom({
    type: 'create:pressing',
    ingredients: [{ tag: 'c:storage_blocks/steel' }],
    results: [{ id: 'rha:hardsteelslate', count: 4 }]
  }).id('kubejs:rha/press_hardsteel')

  // Tier 1b: Slashedsteel — cut/patterned armor
  event.custom({
    type: 'create:mechanical_crafting',
    pattern: ['III', 'HSH', 'III'],
    key: {
      I: { tag: 'c:plates/iron' },
      H: { item: 'rha:hardsteelslate' },
      S: { tag: 'c:ingots/steel' }
    },
    result: { id: 'rha:slashedsteelslate', count: 4 }
  }).id('kubejs:rha/craft_slashedsteel')

  // Tier 1c: Rivetedsteel — fastened armor
  event.custom({
    type: 'create:mechanical_crafting',
    pattern: ['R R', 'HH ', 'R R'],
    key: {
      R: { tag: 'c:nuggets/steel' },
      H: { item: 'rha:hardsteelslate' }
    },
    result: { id: 'rha:rivetedsteelslate', count: 2 }
  }).id('kubejs:rha/craft_rivetedsteel')

  // Tier 2: Layeredsteel — composite directional armor (requires Destroy)
  if (Platform.isLoaded('destroy')) {
    event.custom({
      type: 'create:mechanical_crafting',
      pattern: ['PPP', 'HSH', 'PPP'],
      key: {
        P: { tag: 'destroy:plastics/rigid' },
        H: { item: 'rha:hardsteelslate' },
        S: { item: 'destroy:stainless_steel_sheet' }
      },
      result: { id: 'rha:layeredsteelslate', count: 2 }
    }).id('kubejs:rha/craft_layeredsteel')

  }

  // Stonecutting: slate base → 2 colored blocks
  function stonecutColors(family, colors) {
    var slateId = 'rha:' + family + 'slate'
    colors.forEach(function (suffix) {
      var colorId = 'rha:' + family + suffix
      event.stonecutting('2x ' + colorId, slateId)
        .id('kubejs:rha/stonecut_' + family + '_' + suffix)
    })
  }

  stonecutColors('hardsteel', RHA_FAMILIES.hardsteel)
  stonecutColors('slashedsteel', RHA_FAMILIES.slashedsteel)
  stonecutColors('rivetedsteel', RHA_FAMILIES.rivetedsteel)

  if (Platform.isLoaded('destroy')) {
    stonecutColors('layeredsteel', RHA_FAMILIES.layeredsteel)
  }
})
}

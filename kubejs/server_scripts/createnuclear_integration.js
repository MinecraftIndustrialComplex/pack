// Route Create Nuclear through Destroy's material and PPE chains
//
// 1. Canonical lead: destroy:lead_ingot
// 2. Steel → Stainless steel in Create Nuclear recipes
// 3. Anti-radiation armor as hazmat upgrades
// 4. Reactor material gating: Destroy stainless steel, borosilicate glass,
//    circuit boards, and CC:Tweaked advanced computer

var COLORS = [
  'black', 'blue', 'brown', 'cyan', 'gray', 'green',
  'light_blue', 'light_gray', 'lime', 'magenta', 'orange',
  'pink', 'purple', 'red', 'white', 'yellow'
]

var DYE_MAP = {
  black: 'minecraft:black_dye',        blue: 'minecraft:blue_dye',
  brown: 'minecraft:brown_dye',        cyan: 'minecraft:cyan_dye',
  gray: 'minecraft:gray_dye',          green: 'minecraft:green_dye',
  light_blue: 'minecraft:light_blue_dye', light_gray: 'minecraft:light_gray_dye',
  lime: 'minecraft:lime_dye',          magenta: 'minecraft:magenta_dye',
  orange: 'minecraft:orange_dye',      pink: 'minecraft:pink_dye',
  purple: 'minecraft:purple_dye',      red: 'minecraft:red_dye',
  white: 'minecraft:white_dye',        yellow: 'minecraft:yellow_dye'
}

ServerEvents.recipes(e => {
  e.replaceInput({}, 'createnuclear:steel_ingot', 'destroy:stainless_steel_ingot')
  e.replaceInput({}, 'createnuclear:steel_nugget', 'destroy:stainless_steel_ingot')
  e.replaceInput({}, 'createnuclear:steel_block', 'destroy:stainless_steel_block')

  e.shapeless('destroy:lead_ingot', ['createnuclear:lead_ingot'])
    .id('kubejs:createnuclear/convert_lead_ingot')
  e.shapeless('destroy:lead_ingot', ['createnuclear:lead_block'])
    .id('kubejs:createnuclear/convert_lead_block')

  COLORS.forEach(c => {
    e.remove({ output: `createnuclear:${c}_cloth` })
    e.remove({ output: `createnuclear:${c}_anti_radiation_helmet` })
    e.remove({ output: `createnuclear:${c}_anti_radiation_chestplate` })
    e.remove({ output: `createnuclear:${c}_anti_radiation_leggings` })
  })
  e.remove({ output: 'createnuclear:anti_radiation_boots' })

  e.recipes.create.mixing('2x createnuclear:white_cloth', [
    'destroy:nylon',
    'destroy:polyethene',
    'destroy:lead_powder'
  ]).heated()
    .id('kubejs:createnuclear/mix_white_cloth')

  COLORS.forEach(c => {
    if (c === 'white') return
    e.shapeless(`createnuclear:${c}_cloth`, [
      'createnuclear:white_cloth',
      DYE_MAP[c]
    ]).id(`kubejs:createnuclear/dye_cloth_${c}`)
  })

  COLORS.forEach(c => {
    e.custom({
      type: 'minecraft:smithing_transform',
      template: { item: `createnuclear:${c}_cloth` },
      base:      { item: 'destroy:gas_mask' },
      addition:  { item: 'destroy:lead_ingot' },
      result:    { id: `createnuclear:${c}_anti_radiation_helmet` }
    }).id(`kubejs:createnuclear/upgrade_helmet_${c}`)

    e.custom({
      type: 'minecraft:smithing_transform',
      template: { item: `createnuclear:${c}_cloth` },
      base:      { item: 'destroy:hazmat_suit' },
      addition:  { item: 'destroy:lead_ingot' },
      result:    { id: `createnuclear:${c}_anti_radiation_chestplate` }
    }).id(`kubejs:createnuclear/upgrade_chestplate_${c}`)

    e.custom({
      type: 'minecraft:smithing_transform',
      template: { item: `createnuclear:${c}_cloth` },
      base:      { item: 'destroy:hazmat_leggings' },
      addition:  { item: 'destroy:lead_ingot' },
      result:    { id: `createnuclear:${c}_anti_radiation_leggings` }
    }).id(`kubejs:createnuclear/upgrade_leggings_${c}`)
  })

  e.custom({
    type: 'minecraft:smithing_transform',
    template: { item: 'createnuclear:white_cloth' },
    base:      { item: 'destroy:wellington_boots' },
    addition:  { item: 'destroy:lead_ingot' },
    result:    { id: 'createnuclear:anti_radiation_boots' }
  }).id('kubejs:createnuclear/upgrade_boots')

  // Reactor Controller: requires CC:Tweaked advanced computer
  e.remove({ id: 'createnuclear:mechanical_crafting/reactor_controller' })
  e.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    key: {
      C: { item: 'createnuclear:reactor_casing' },
      N: { item: 'minecraft:netherite_ingot' },
      O: { item: 'create:content_observer' },
      T: { item: 'create:electron_tube' },
      V: { item: 'create:item_vault' },
      X: { item: 'computercraft:computer_advanced' }
    },
    pattern: [
      'CCCCC',
      'CNONC',
      'CTXTC',
      'CNVNC',
      'CCCCC'
    ],
    result: { id: 'createnuclear:reactor_controller' }
  }).id('kubejs:createnuclear/reactor_controller')

  e.remove({ id: 'createnuclear:item_application/reactor_casing_from_steel_and_brass_casing' })
  e.custom({
    type: 'create:item_application',
    ingredients: [
      { item: 'create:brass_casing' },
      { item: 'destroy:stainless_steel_ingot' }
    ],
    results: [{ id: 'createnuclear:reactor_casing' }]
  }).id('kubejs:createnuclear/reactor_casing')

  e.remove({ id: 'createnuclear:crafting/reactor/reinforced_glass' })
  e.shaped('createnuclear:reinforced_glass', [
    'LGL',
    'GLG',
    'LGL'
  ], {
    L: '#c:ingots/lead',
    G: 'destroy:borosilicate_glass'
  }).id('kubejs:createnuclear/reinforced_glass')

  e.remove({ id: 'createnuclear:mechanical_crafting/reactor_cooler' })
  e.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    key: {
      C: { item: 'createnuclear:reactor_casing' },
      G: { item: 'createnuclear:reinforced_glass' },
      I: { item: 'minecraft:blue_ice' },
      S: { item: 'destroy:stainless_steel_ingot' }
    },
    pattern: [
      'CCCCC',
      'CSGSC',
      'CIGIC',
      'CSGSC',
      'CCCCC'
    ],
    result: { id: 'createnuclear:reactor_cooler' }
  }).id('kubejs:createnuclear/reactor_cooler')

  e.remove({ id: 'createnuclear:mechanical_crafting/reactor_core' })
  e.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    key: {
      B: { item: 'createnuclear:uranium_bucket' },
      C: { item: 'createnuclear:reactor_casing' },
      P: { item: 'create:precision_mechanism' },
      S: { item: 'destroy:stainless_steel_ingot' }
    },
    pattern: [
      'CCCCC',
      'CPSPC',
      'CSBSC',
      'CPSPC',
      'CCCCC'
    ],
    result: { id: 'createnuclear:reactor_core' }
  }).id('kubejs:createnuclear/reactor_core')

  e.remove({ id: 'createnuclear:mechanical_crafting/reactor_frame' })
  e.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    key: {
      B: { item: 'createnuclear:uranium_bucket' },
      C: { item: 'createnuclear:reactor_casing' },
      G: { item: 'createnuclear:reinforced_glass' },
      S: { item: 'destroy:stainless_steel_ingot' }
    },
    pattern: [
      'CCCCC',
      'CSGSC',
      'CGBGC',
      'CSGSC',
      'CCCCC'
    ],
    result: { id: 'createnuclear:reactor_frame' }
  }).id('kubejs:createnuclear/reactor_frame')

  e.remove({ id: 'createnuclear:crafting/reactor_blueprint_item' })
  e.shaped('createnuclear:reactor_blueprint_item', [
    'SDS',
    'SPS',
    'SES'
  ], {
    D: 'create:display_board',
    E: 'create:empty_schematic',
    P: 'create:precision_mechanism',
    S: 'destroy:stainless_steel_ingot'
  }).id('kubejs:createnuclear/reactor_blueprint')
})

ServerEvents.tags('item', e => {
  e.add('c:ingots/lead', 'destroy:lead_ingot')
  e.add('c:storage_blocks/lead', 'destroy:lead_block')
  e.remove('c:ingots/lead', 'createnuclear:lead_ingot')
  e.remove('c:storage_blocks/lead', 'createnuclear:lead_block')
})

ServerEvents.recipes(e => {
  e.custom({
    type: 'destroy:sieving',
    ingredients: [{ item: 'createnuclear:uranium_ore' }],
    results: [
      { count: 1, chance: 0.75, id: 'destroy:lead_powder' },
      { count: 1, chance: 0.25, id: 'destroy:chromium_powder' },
      { count: 1, chance: 0.25, id: 'create:experience_nugget' }
    ]
  }).id('kubejs:createnuclear/sieve_uranium_ore')

  e.custom({
    type: 'destroy:sieving',
    ingredients: [{ item: 'createnuclear:deepslate_uranium_ore' }],
    results: [
      { count: 1, chance: 0.75, id: 'destroy:lead_powder' },
      { count: 1, chance: 0.35, id: 'destroy:chromium_powder' },
      { count: 1, chance: 0.35, id: 'create:experience_nugget' }
    ]
  }).id('kubejs:createnuclear/sieve_deepslate_uranium_ore')
})

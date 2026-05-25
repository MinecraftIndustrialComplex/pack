const MB_INGOT = 90
const MB_NUGGET = 10
const MB_BLOCK = 810

const CBC_MATERIALS = {
  steel: 'createmetallurgy:molten_steel',
  bronze: 'createmetallurgy:molten_bronze',
  cast_iron: 'createbigcannons:molten_cast_iron',
  nethersteel: 'createbigcannons:molten_nethersteel'
}

/** Approximate melt yield (mB) from CBC block id patterns. */
function meltAmountFor(itemId) {
  const id = itemId.replace('createbigcannons:', '')
  if (id.includes('nugget')) return MB_NUGGET
  if (id.endsWith('_block') || id === 'bronze_block') return MB_BLOCK
  if (id.includes('ingot')) return MB_INGOT
  if (id.includes('very_large')) return MB_INGOT * 5
  if (id.includes('very_small')) return MB_INGOT
  if (id.includes('large') && !id.includes('very_large')) return MB_INGOT * 4
  if (id.includes('medium')) return MB_INGOT * 3
  if (id.includes('small') && !id.includes('very_small')) return MB_INGOT * 2
  if (id.includes('thick')) return MB_INGOT * 6
  if (id.includes('built_up')) return MB_INGOT * 8
  if (id.includes('cannon_chamber') || id.includes('cannon_barrel')) return MB_INGOT * 4
  if (id.includes('breech') || id.includes('autocannon') || id.includes('recoil')) return MB_INGOT * 3
  if (id.includes('sliding') || id.includes('quickfiring')) return MB_INGOT * 2
  if (id.includes('cannon_end')) return MB_INGOT
  if (id.includes('scrap')) return MB_NUGGET * 4
  if (id.includes('extractor') || id.includes('partial_')) return MB_INGOT * 2
  return MB_INGOT * 3
}

function materialKeyFor(itemId) {
  if (itemId.includes('nethersteel')) return 'nethersteel'
  if (itemId.includes('cast_iron')) return 'cast_iron'
  if (itemId.includes('bronze')) return 'bronze'
  if (itemId.includes('steel')) return 'steel'
  return null
}

function shouldSkipCbcMelt(itemId) {
  const id = itemId.replace('createbigcannons:', '')
  if (id.startsWith('molten_')) return true
  if (id.includes('cast_mould') || id === 'casting_sand') return true
  if (id.endsWith('_lock')) return true
  return false
}

const CBC_CANNON_PARTS = [
  'bronze_autocannon_barrel', 'bronze_autocannon_breech', 'bronze_autocannon_breech_extractor',
  'bronze_autocannon_recoil_spring', 'bronze_cannon_barrel', 'bronze_cannon_chamber', 'bronze_cannon_end',
  'bronze_quickfiring_breech', 'bronze_sliding_breech', 'bronze_sliding_breechblock',
  'built_up_nethersteel_cannon_barrel', 'built_up_nethersteel_cannon_chamber',
  'built_up_steel_cannon_barrel', 'built_up_steel_cannon_chamber',
  'cast_iron_autocannon_barrel', 'cast_iron_autocannon_breech', 'cast_iron_autocannon_breech_extractor',
  'cast_iron_autocannon_recoil_spring', 'cast_iron_cannon_barrel', 'cast_iron_cannon_chamber',
  'cast_iron_cannon_end', 'cast_iron_quickfiring_breech', 'cast_iron_sliding_breech',
  'cast_iron_sliding_breechblock',
  'incomplete_bronze_autocannon_breech', 'incomplete_bronze_autocannon_recoil_spring',
  'incomplete_bronze_sliding_breech', 'incomplete_cast_iron_autocannon_breech',
  'incomplete_cast_iron_autocannon_recoil_spring', 'incomplete_cast_iron_sliding_breech',
  'incomplete_nethersteel_screw_breech', 'incomplete_steel_autocannon_breech',
  'incomplete_steel_autocannon_recoil_spring', 'incomplete_steel_screw_breech', 'incomplete_steel_sliding_breech',
  'large_nethersteel_cannon_layer', 'large_steel_cannon_layer',
  'medium_nethersteel_cannon_layer', 'medium_steel_cannon_layer',
  'nethersteel_cannon_barrel', 'nethersteel_cannon_chamber',
  'nethersteel_screw_breech',
  'small_nethersteel_cannon_layer', 'small_steel_cannon_layer',
  'steel_autocannon_barrel', 'steel_autocannon_breech', 'steel_autocannon_breech_extractor',
  'steel_autocannon_recoil_spring', 'steel_cannon_barrel', 'steel_cannon_chamber',
  'steel_quickfiring_breech', 'steel_screw_breech', 'steel_sliding_breech', 'steel_sliding_breechblock',
  'thick_nethersteel_cannon_chamber', 'thick_steel_cannon_chamber',
  'unbored_bronze_autocannon_barrel', 'unbored_bronze_autocannon_breech', 'unbored_bronze_autocannon_recoil_spring',
  'unbored_bronze_cannon_barrel', 'unbored_bronze_cannon_chamber', 'unbored_bronze_sliding_breech',
  'unbored_cast_iron_autocannon_barrel', 'unbored_cast_iron_autocannon_breech',
  'unbored_cast_iron_autocannon_recoil_spring', 'unbored_cast_iron_cannon_barrel',
  'unbored_cast_iron_cannon_chamber', 'unbored_cast_iron_sliding_breech',
  'unbored_large_nethersteel_cannon_layer', 'unbored_large_steel_cannon_layer',
  'unbored_medium_nethersteel_cannon_layer', 'unbored_medium_steel_cannon_layer',
  'unbored_nethersteel_screw_breech', 'unbored_small_nethersteel_cannon_layer', 'unbored_small_steel_cannon_layer',
  'unbored_steel_autocannon_barrel', 'unbored_steel_autocannon_breech', 'unbored_steel_autocannon_recoil_spring',
  'unbored_steel_screw_breech', 'unbored_steel_sliding_breech',
  'unbored_very_large_nethersteel_cannon_layer', 'unbored_very_large_steel_cannon_layer',
  'unbored_very_small_nethersteel_cannon_layer', 'unbored_very_small_steel_cannon_layer',
  'very_large_nethersteel_cannon_layer', 'very_large_steel_cannon_layer',
  'very_small_nethersteel_cannon_layer', 'very_small_steel_cannon_layer',
  'partial_bronze_autocannon_breech_extractor', 'partial_cast_iron_autocannon_breech_extractor',
  'partial_steel_autocannon_breech_extractor',
  'bronze_scrap', 'steel_scrap',
  'cast_iron_ingot', 'cast_iron_nugget', 'cast_iron_block',
  'nethersteel_ingot', 'nethersteel_nugget', 'nethersteel_block',
  'bronze_ingot', 'bronze_block'
]

ServerEvents.tags('fluid', e => {
  e.add('c:molten_steel', [
    'createmetallurgy:molten_steel',
    'createmetallurgy:flowing_molten_steel'
  ])
  e.add('c:molten_bronze', [
    'createmetallurgy:molten_bronze',
    'createmetallurgy:flowing_molten_bronze'
  ])
})

ServerEvents.recipes(e => {
  e.remove({ type: 'createbigcannons:melting' })

  const removeIds = [
    'createbigcannons:iron_to_cast_iron_ingot',
    'createbigcannons:iron_to_cast_iron_block',
    'createbigcannons:forge_cast_iron_ingot',
    'createbigcannons:forge_cast_iron_nugget',
    'createbigcannons:forge_cast_iron_block',
    'createbigcannons:forge_steel_ingot',
    'createbigcannons:forge_steel_nugget',
    'createbigcannons:forge_steel_block',
    'createbigcannons:forge_bronze_ingot',
    'createbigcannons:forge_bronze_nugget',
    'createbigcannons:forge_bronze_block',
    'createbigcannons:forge_nethersteel_ingot',
    'createbigcannons:forge_nethersteel_nugget',
    'createbigcannons:forge_nethersteel_block',
    'createbigcannons:alloy_nethersteel_steel',
    'createbigcannons:alloy_nethersteel_cast_iron'
  ]
  removeIds.forEach(function (id) {
    e.remove({ id: id })
  })

  e.recipes.createmetallurgy
    .alloying(Fluid.of(CBC_MATERIALS.cast_iron, MB_INGOT), [
      Fluid.of('createmetallurgy:molten_iron', MB_INGOT),
      'minecraft:charcoal'
    ])
    .processingTime(40)
    .heated()
    .id('kubejs:cbc/alloy_cast_iron')

  e.recipes.createmetallurgy
    .alloying(Fluid.of(CBC_MATERIALS.nethersteel, MB_INGOT * 8), [
      Fluid.of(CBC_MATERIALS.steel, MB_INGOT * 4),
      'minecraft:netherite_scrap'
    ])
    .processingTime(100)
    .heatLevel("HYPERHEATED")
    .id('kubejs:cbc/alloy_nethersteel_from_steel')

  e.recipes.createmetallurgy
    .alloying(Fluid.of(CBC_MATERIALS.nethersteel, MB_INGOT * 8), [
      Fluid.of(CBC_MATERIALS.cast_iron, MB_INGOT * 8),
      'minecraft:netherite_scrap'
    ])
    .processingTime(100)
    .heatLevel("HYPERHEATED")
    .id('kubejs:cbc/alloy_nethersteel_from_cast_iron')

  const castForms = [
    { item: 'createbigcannons:cast_iron_ingot', fluid: CBC_MATERIALS.cast_iron, amount: MB_INGOT, mold: 'createmetallurgy:graphite_ingot_mold', table: true },
    { item: 'createbigcannons:cast_iron_nugget', fluid: CBC_MATERIALS.cast_iron, amount: MB_NUGGET, mold: 'createmetallurgy:graphite_nugget_mold', table: true },
    { item: 'createbigcannons:cast_iron_block', fluid: CBC_MATERIALS.cast_iron, amount: MB_BLOCK, mold: null, table: false },
    { item: 'createbigcannons:nethersteel_ingot', fluid: CBC_MATERIALS.nethersteel, amount: MB_INGOT, mold: 'createmetallurgy:graphite_ingot_mold', table: true },
    { item: 'createbigcannons:nethersteel_nugget', fluid: CBC_MATERIALS.nethersteel, amount: MB_NUGGET, mold: 'createmetallurgy:graphite_nugget_mold', table: true },
    { item: 'createbigcannons:nethersteel_block', fluid: CBC_MATERIALS.nethersteel, amount: MB_BLOCK, mold: null, table: false }
  ]

  castForms.forEach(function (form) {
    const time = Math.max(20, Math.floor(form.amount / 3))
    const suffix = form.item.split(':')[1]
    if (form.table) {
      e.recipes.createmetallurgy
        .casting_in_table(form.item, [Fluid.of(form.fluid, form.amount), form.mold])
        .processingTime(time)
        .id('kubejs:cbc/cast_table_' + suffix)
    } else {
      e.recipes.createmetallurgy
        .casting_in_basin(form.item, [Fluid.of(form.fluid, form.amount)])
        .processingTime(time)
        .id('kubejs:cbc/cast_basin_' + suffix)
    }
  })

  CBC_CANNON_PARTS.forEach(function (part) {
    const item = 'createbigcannons:' + part
    if (shouldSkipCbcMelt(item)) return

    const mat = materialKeyFor(item)
    if (!mat) return

    const fluid = CBC_MATERIALS[mat]
    const amount = meltAmountFor(item)
    const time = Math.max(20, Math.floor(amount / 3))

    e.recipes.createmetallurgy
      .melting(Fluid.of(fluid, amount), item)
      .processingTime(time)
      .heated()
      .id('kubejs:cbc/melt_' + part)
  })
})

const CM = 'createmetallurgy'
const DS = 'destroy'
const FLUID_OF = Fluid.of
const INGOT_MB = 90
const BLOCK_MB = 810

ServerEvents.recipes(e => {
  e.remove({ id: 'destroy:arc_furnace/stainless_steel_efficient' })
  e.remove({ id: 'destroy:arc_furnace/stainless_steel_efficient_fluxed' })
  e.remove({ id: 'destroy:mixing/stainless_steel_default' })
  e.remove({ id: 'destroy:mixing/stainless_steel_default_fluxed' })
  e.remove({ id: 'destroy:mixing/stainless_steel_inefficient' })
  e.remove({ id: 'destroy:mixing/stainless_steel_inefficient_fluxed' })

  // Stainless steel alloying — requires chromium, nickel, iron
  // ARC_FURNACE: stainless_steel_efficient — candidates for arc_heat once CreateHeatJS is configured
  e.recipes[CM]
    .alloying(FLUID_OF(`${DS}:molten_stainless_steel`, 1000), [
      FLUID_OF(`${CM}:molten_iron`, 450),
      FLUID_OF(`${CM}:molten_nickel`, 180),
      FLUID_OF('kubejs:molten_chromium', 90),
      'minecraft:charcoal'
    ])
    .processingTime(200)
    .superheated()
    .id('kubejs:destroy/alloy_stainless_steel')

  // ARC_FURNACE: stainless_steel_efficient_fluxed — fluxed variant, faster
  e.recipes[CM]
    .alloying(FLUID_OF(`${DS}:molten_stainless_steel`, 1000), [
      FLUID_OF(`${CM}:molten_iron`, 450),
      FLUID_OF(`${CM}:molten_nickel`, 180),
      FLUID_OF('kubejs:molten_chromium', 90),
      'minecraft:charcoal',
      '#destroy:fluxes'
    ])
    .processingTime(160)
    .superheated()
    .id('kubejs:destroy/alloy_stainless_steel_fluxed')

  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_nickel`, INGOT_MB), `${DS}:nickel_ingot`).processingTime(30).heated().id('kubejs:destroy/melt_nickel_ingot')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_nickel`, INGOT_MB), `${DS}:nickel_powder`).processingTime(30).heated().id('kubejs:destroy/melt_nickel_powder')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_nickel`, BLOCK_MB), `${DS}:nickel_block`).processingTime(180).heated().id('kubejs:destroy/melt_nickel_block')

  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_lead`, INGOT_MB), `${DS}:lead_ingot`).processingTime(20).heated().id('kubejs:destroy/melt_lead_ingot')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_lead`, INGOT_MB), `${DS}:lead_powder`).processingTime(20).heated().id('kubejs:destroy/melt_lead_powder')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_lead`, BLOCK_MB), `${DS}:lead_block`).processingTime(120).heated().id('kubejs:destroy/melt_lead_block')

  e.recipes[CM].melting(FLUID_OF(`${DS}:molten_stainless_steel`, INGOT_MB), `${DS}:stainless_steel_ingot`).processingTime(40).superheated().id('kubejs:destroy/melt_stainless_ingot')
  e.recipes[CM].melting(FLUID_OF(`${DS}:molten_stainless_steel`, INGOT_MB), `${DS}:stainless_steel_sheet`).processingTime(40).superheated().id('kubejs:destroy/melt_stainless_sheet')
  e.recipes[CM].melting(FLUID_OF(`${DS}:molten_stainless_steel`, INGOT_MB), `${DS}:stainless_steel_rod`).processingTime(40).superheated().id('kubejs:destroy/melt_stainless_rod')
  e.recipes[CM].melting(FLUID_OF(`${DS}:molten_stainless_steel`, BLOCK_MB), `${DS}:stainless_steel_block`).processingTime(240).superheated().id('kubejs:destroy/melt_stainless_block')
  e.recipes[CM].melting(FLUID_OF(`${DS}:molten_stainless_steel`, BLOCK_MB), `${DS}:stainless_steel_rods_block`).processingTime(240).superheated().id('kubejs:destroy/melt_stainless_rods_block')

  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, INGOT_MB), `${DS}:pure_gold_ingot`).processingTime(25).heated().id('kubejs:destroy/melt_pure_gold_ingot')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, INGOT_MB), `${DS}:pure_gold_dust`).processingTime(25).heated().id('kubejs:destroy/melt_pure_gold_dust')

  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_copper`, INGOT_MB), `${DS}:copper_powder`).processingTime(30).heated().id('kubejs:destroy/melt_copper_powder')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_iron`, INGOT_MB), `${DS}:iron_powder`).processingTime(35).heated().id('kubejs:destroy/melt_iron_powder')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_zinc`, INGOT_MB), `${DS}:zinc_powder`).processingTime(20).heated().id('kubejs:destroy/melt_zinc_powder')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_zinc`, INGOT_MB), `${DS}:zinc_sheet`).processingTime(20).heated().id('kubejs:destroy/melt_zinc_sheet')

  e.recipes[CM].melting(FLUID_OF('kubejs:molten_chromium', INGOT_MB), `${DS}:chromium_ingot`).processingTime(50).superheated().id('kubejs:destroy/melt_chromium_ingot')
  e.recipes[CM].melting(FLUID_OF('kubejs:molten_chromium', INGOT_MB), `${DS}:chromium_powder`).processingTime(50).superheated().id('kubejs:destroy/melt_chromium_powder')
  e.recipes[CM].melting(FLUID_OF('kubejs:molten_chromium', BLOCK_MB), `${DS}:chromium_block`).processingTime(300).superheated().id('kubejs:destroy/melt_chromium_block')
  e.recipes[CM].melting(FLUID_OF('kubejs:molten_chromium', 10), `${DS}:chromium_nugget`).processingTime(15).superheated().id('kubejs:destroy/melt_chromium_nugget')
  e.recipes[CM].melting(FLUID_OF('kubejs:molten_chromium', INGOT_MB), `${DS}:crushed_raw_chromium`).processingTime(50).superheated().id('kubejs:destroy/melt_crushed_chromium')

  // PGM metals → molten_gold placeholder
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, INGOT_MB), `${DS}:platinum_ingot`).processingTime(50).superheated().id('kubejs:destroy/melt_platinum_ingot')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, INGOT_MB), `${DS}:platinum_powder`).processingTime(50).superheated().id('kubejs:destroy/melt_platinum_powder')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, BLOCK_MB), `${DS}:platinum_block`).processingTime(300).superheated().id('kubejs:destroy/melt_platinum_block')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, INGOT_MB), `${DS}:palladium_ingot`).processingTime(45).superheated().id('kubejs:destroy/melt_palladium_ingot')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, INGOT_MB), `${DS}:palladium_powder`).processingTime(45).superheated().id('kubejs:destroy/melt_palladium_powder')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, BLOCK_MB), `${DS}:palladium_block`).processingTime(270).superheated().id('kubejs:destroy/melt_palladium_block')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, INGOT_MB), `${DS}:rhodium_ingot`).processingTime(55).superheated().id('kubejs:destroy/melt_rhodium_ingot')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, INGOT_MB), `${DS}:rhodium_powder`).processingTime(55).superheated().id('kubejs:destroy/melt_rhodium_powder')
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_gold`, BLOCK_MB), `${DS}:rhodium_block`).processingTime(330).superheated().id('kubejs:destroy/melt_rhodium_block')

  // Sodium → molten_lithium placeholder
  e.recipes[CM].melting(FLUID_OF(`${CM}:molten_lithium`, INGOT_MB), `${DS}:sodium_ingot`).processingTime(10).id('kubejs:destroy/melt_sodium_ingot')

  e.recipes[CM]
    .casting_in_table(`${DS}:stainless_steel_ingot`, [
      FLUID_OF(`${DS}:molten_stainless_steel`, INGOT_MB),
      `${CM}:graphite_ingot_mold`
    ])
    .processingTime(60)
    .id('kubejs:destroy/cast_stainless_ingot')

  e.recipes[CM]
    .casting_in_table(`${DS}:stainless_steel_sheet`, [
      FLUID_OF(`${DS}:molten_stainless_steel`, INGOT_MB),
      `${CM}:graphite_plate_mold`
    ])
    .processingTime(60)
    .id('kubejs:destroy/cast_stainless_sheet')

  e.recipes[CM]
    .casting_in_table(`${DS}:stainless_steel_rod`, [
      FLUID_OF(`${DS}:molten_stainless_steel`, INGOT_MB),
      `${CM}:graphite_rod_mold`
    ])
    .processingTime(60)
    .id('kubejs:destroy/cast_stainless_rod')

  e.recipes[CM]
    .casting_in_basin(`${DS}:stainless_steel_block`, [
      FLUID_OF(`${DS}:molten_stainless_steel`, BLOCK_MB)
    ])
    .processingTime(300)
    .id('kubejs:destroy/cast_stainless_block')

  e.recipes[CM]
    .casting_in_table(`${DS}:chromium_ingot`, [
      FLUID_OF('kubejs:molten_chromium', INGOT_MB),
      `${CM}:graphite_ingot_mold`
    ])
    .processingTime(80)
    .id('kubejs:destroy/cast_chromium_ingot')

  e.recipes[CM]
    .casting_in_table(`${DS}:chromium_nugget`, [
      FLUID_OF('kubejs:molten_chromium', 10),
      `${CM}:graphite_nugget_mold`
    ])
    .processingTime(10)
    .id('kubejs:destroy/cast_chromium_nugget')

  e.recipes[CM]
    .casting_in_basin(`${DS}:chromium_block`, [
      FLUID_OF('kubejs:molten_chromium', BLOCK_MB)
    ])
    .processingTime(480)
    .id('kubejs:destroy/cast_chromium_block')
})

ServerEvents.tags('fluid', e => {
  e.add(`${CM}:molten_material`, [
    `${DS}:molten_stainless_steel`,
    `${DS}:flowing_molten_stainless_steel`,
    'kubejs:molten_chromium',
    'kubejs:flowing_molten_chromium'
  ])
})


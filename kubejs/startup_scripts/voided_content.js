global.VOIDED_ITEMS = [
  // oilyunification
  'createdieselgenerators:distillation_controller',
  'createdieselgenerators:bulk_fermenter',
  'destroy:seismometer',
  'destroy:pumpjack',
  'createdieselgenerators:plant_oil_bucket',
  'createdieselgenerators:crude_oil_bucket',
  'createdieselgenerators:biodiesel_bucket',
  // diesel+gasoline buckets unvoided - brought back for petrochem revamp
  'createdieselgenerators:ethanol_bucket',

  // duplicate steel (createmetallurgy is canonical)
  'overgeared:steel_ingot',
  'createbigcannons:steel_ingot',
  'createnuclear:steel_ingot',
  'createnuclear:steel_nugget',
  'createnuclear:steel_block',

  // duplicate lead (destroy is canonical)
  'createnuclear:lead_ingot',
  'createnuclear:lead_nugget',
  'createnuclear:lead_block',
  'overgeared:crude_steel',
  'overgeared:unfired_tool_cast',
  'overgeared:clay_tool_cast',
  'overgeared:nether_tool_cast',
  'overgeared:alloy_furnace',
  'overgeared:nether_alloy_furnace',
  'overgeared:casting_furnace',

  // create aeronautics
  'simulated:engine_assembly',
  'simulated:incomplete_engine_assembly',

  // legendary survival overhaul (herbs replaced by cobblemon)
  'legendarysurvivaloverhaul:heart_container',
  'legendarysurvivaloverhaul:sun_fern_leaf',
  'legendarysurvivaloverhaul:sun_fern_gold_leaf',
  'legendarysurvivaloverhaul:sun_fern_seeds',
  'legendarysurvivaloverhaul:ice_fern_leaf',
  'legendarysurvivaloverhaul:ice_fern_gold_leaf',
  'legendarysurvivaloverhaul:ice_fern_seeds',
  'legendarysurvivaloverhaul:cold_string',
  'legendarysurvivaloverhaul:warm_string',

  // big cannons (canonical: createmetallurgy)
  'createbigcannons:molten_steel_bucket',
  'createbigcannons:molten_bronze_bucket',

  // guncotton replaced by destroy:nitrocellulose
  'createbigcannons:guncotton',

  // vintage (belt grinder + centrifuge replaced)
  'createvintageneoforged:belt_grinder',
  'createvintageneoforged:grinder_belt',
  'createdieselgenerators:hammer'
]

global.VOIDED_ITEM_PATTERNS = [
  /^simulated:\w+_portable_engine$/
]

global.VOIDED_FLUIDS = [
  'createdieselgenerators:plant_oil',
  'createdieselgenerators:crude_oil',
  'createdieselgenerators:biodiesel',
  // diesel+gasoline unvoided - brought back for petrochem revamp
  'createdieselgenerators:ethanol',

  // big cannons (canonical: createmetallurgy)
  'createbigcannons:molten_steel',
  'createbigcannons:flowing_molten_steel',
  'createbigcannons:molten_bronze',
  'createbigcannons:flowing_molten_bronze'
]

// entire mods removed
global.VOIDED_MOD_IDS = [
  'iceandfire',
  'crusty_chunks',
  'l2complements'
]

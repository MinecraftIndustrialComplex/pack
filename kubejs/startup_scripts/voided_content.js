// Items and fluids unobtainable after recipe removal — shared by voided_jei (client) and server scripts.
global.VOIDED_ITEMS = [
  // oilyunification
  'createdieselgenerators:distillation_controller',
  'createdieselgenerators:bulk_fermenter',
  'destroy:seismometer',
  'destroy:pumpjack',
  'createdieselgenerators:plant_oil_bucket',
  'createdieselgenerators:crude_oil_bucket',
  'createdieselgenerators:biodiesel_bucket',
  'createdieselgenerators:gasoline_bucket',
  'createdieselgenerators:ethanol_bucket',

  // overgeared / duplicate steel (createmetallurgy:steel_ingot is canonical)
  'overgeared:steel_ingot',
  'createbigcannons:steel_ingot',
  'createnuclear:steel_ingot',
  'createnuclear:steel_nugget',
  'createnuclear:steel_block',

  // duplicate lead (destroy:lead_ingot is canonical)
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

  // legendary survival overhaul
  'legendarysurvivaloverhaul:heart_container',
  // Original herbs replaced by cobblemon integration
  'legendarysurvivaloverhaul:sun_fern_leaf',
  'legendarysurvivaloverhaul:sun_fern_gold_leaf',
  'legendarysurvivaloverhaul:sun_fern_seeds',
  'legendarysurvivaloverhaul:ice_fern_leaf',
  'legendarysurvivaloverhaul:ice_fern_gold_leaf',
  'legendarysurvivaloverhaul:ice_fern_seeds',
  'legendarysurvivaloverhaul:cold_string',
  'legendarysurvivaloverhaul:warm_string',

  // create big cannons (use createmetallurgy molten steel/bronze)
  'createbigcannons:molten_steel_bucket',
  'createbigcannons:molten_bronze_bucket',

  // create vintage (use createmetallurgy:mechanical_belt_grinder; destroy:centrifuge for separation)
  'createvintageneoforged:belt_grinder',
  'createvintageneoforged:grinder_belt',
  'createvintageneoforged:centrifuge'
]

global.VOIDED_ITEM_PATTERNS = [
  /^simulated:\w+_portable_engine$/
]

global.VOIDED_FLUIDS = [
  'createdieselgenerators:plant_oil',
  'createdieselgenerators:crude_oil',
  'createdieselgenerators:biodiesel',
  'createdieselgenerators:gasoline',
  'createdieselgenerators:ethanol',

  // create big cannons (canonical: createmetallurgy)
  'createbigcannons:molten_steel',
  'createbigcannons:flowing_molten_steel',
  'createbigcannons:molten_bronze',
  'createbigcannons:flowing_molten_bronze'
]

// Entire mods with all recipes removed
global.VOIDED_MOD_IDS = [
  'iceandfire',
  'crusty_chunks'
]

global.VOIDED_ITEMS_TACZ = [
  'tacz:gun_smith_table',
  'tacz:attachment_workbench',
  'tacz:ammo_workbench'
]

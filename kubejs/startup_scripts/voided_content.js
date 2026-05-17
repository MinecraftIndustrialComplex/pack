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
  'legendarysurvivaloverhaul:heart_container'
]

global.VOIDED_ITEM_PATTERNS = [
  /^simulated:\w+_portable_engine$/
]

global.VOIDED_FLUIDS = [
  'createdieselgenerators:plant_oil',
  'createdieselgenerators:crude_oil',
  'createdieselgenerators:biodiesel',
  'createdieselgenerators:gasoline',
  'createdieselgenerators:ethanol'
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

const RADAR = 'create_radar'
const PG = Platform.isLoaded('powergrid')
const DESTROY = Platform.isLoaded('destroy')

ServerEvents.recipes(event => {
  if (!Platform.isLoaded('create_radar')) return

  event.remove({ mod: 'create_radar' })

  // ==================== CORE RADAR BLOCKS ====================

  if (PG && DESTROY) {
    event.recipes.create.mechanical_crafting(`${RADAR}:radar_bearing`, [
      ' SBS ',
      'SC CS',
      ' MEM ',
      'SC CS',
      ' SBS '
    ], {
      S: '#c:plates/steel',
      B: 'create:electron_tube',
      C: 'powergrid:copper_coil',
      M: 'powergrid:electric_motor',
      E: `create:mechanical_bearing`
    }).id('kubejs:radar/radar_bearing')
  } else if (PG) {
    event.recipes.create.mechanical_crafting(`${RADAR}:radar_bearing`, [
      ' SBS ',
      'SC CS',
      ' MEM ',
      'SC CS',
      ' SBS '
    ], {
      S: '#c:plates/iron',
      B: 'create:electron_tube',
      C: 'powergrid:copper_coil',
      M: 'powergrid:copper_coil',
      E: `create:mechanical_bearing`
    }).id('kubejs:radar/radar_bearing')
  } else if (DESTROY) {
    event.recipes.create.mechanical_crafting(`${RADAR}:radar_bearing`, [
      ' SBS ',
      'SC CS',
      ' MEM ',
      'SC CS',
      ' SBS '
    ], {
      S: 'destroy:stainless_steel_sheet',
      B: 'create:electron_tube',
      C: 'destroy:copper_powder',
      M: 'create:precision_mechanism',
      E: `create:mechanical_bearing`
    }).id('kubejs:radar/radar_bearing')
  } else {
    event.recipes.create.mechanical_crafting(`${RADAR}:radar_bearing`, [
      ' IBI ',
      'IC CI',
      ' PBP ',
      'IC CI',
      ' IBI '
    ], {
      I: '#c:plates/iron',
      B: 'create:electron_tube',
      C: '#c:plates/copper',
      P: 'create:precision_mechanism'
    }).id('kubejs:radar/radar_bearing')
  }

  // --- Radar Receiver Block (mechanical crafting — antenna/detector) ---
  if (PG && DESTROY) {
    event.recipes.create.mechanical_crafting(`${RADAR}:radar_receiver_block`, [
      '  A  ',
      ' RCR ',
      '  E  '
    ], {
      A: 'minecraft:lightning_rod',
      R: 'destroy:stainless_steel_ingot',
      C: 'powergrid:capacitor',
      E: 'create:electron_tube'
    }).id('kubejs:radar/radar_receiver_block')
  } else if (PG) {
    event.recipes.create.mechanical_crafting(`${RADAR}:radar_receiver_block`, [
      '  A  ',
      ' ICI ',
      '  E  '
    ], {
      A: 'minecraft:lightning_rod',
      I: '#c:plates/iron',
      C: 'powergrid:capacitor',
      E: 'create:electron_tube'
    }).id('kubejs:radar/radar_receiver_block')
  } else if (DESTROY) {
    event.recipes.create.mechanical_crafting(`${RADAR}:radar_receiver_block`, [
      '  A  ',
      ' RIR ',
      '  E  '
    ], {
      A: 'minecraft:lightning_rod',
      R: 'destroy:stainless_steel_ingot',
      I: 'create:industrial_iron_block',
      E: 'create:electron_tube'
    }).id('kubejs:radar/radar_receiver_block')
  } else {
    event.shaped(`${RADAR}:radar_receiver_block`, ['R/I/E'], {
      R: 'minecraft:lightning_rod',
      I: 'create:industrial_iron_block',
      E: 'create:electron_tube'
    }).id('kubejs:radar/radar_receiver_block')
  }

  // --- Radar Dish Block (shaped — parabolic antenna dish) ---
  event.shaped(`${RADAR}:radar_dish_block`, ['IBI', ' B ', ' I '], {
    I: '#c:plates/steel',
    B: 'minecraft:iron_bars'
  }).id('kubejs:radar/radar_dish_block')

  // --- Radar Plate Block (shaped — flat phased-array plate) ---
  event.shaped(`${RADAR}:radar_plate_block`, [
    'SSS',
    'SSS',
    'SSS'
  ], {
    S: '#c:plates/steel'
  }).id('kubejs:radar/radar_plate_block')

  // --- Plane Radar (mechanical crafting — pre-assembled compact radar) ---
  event.recipes.create.mechanical_crafting(`${RADAR}:plane_radar`, [
    '  D  ',
    ' DRD ',
    '  B  '
  ], {
    D: `${RADAR}:radar_dish_block`,
    R: `${RADAR}:radar_receiver_block`,
    B: 'create:brass_casing'
  }).id('kubejs:radar/plane_radar')

  // ==================== NETWORK COMPONENTS ====================

  // --- Data Link (shaped — network connector block) ---
  event.shaped(`${RADAR}:data_link`, ['R/B/T'], {
    R: 'minecraft:redstone_torch',
    B: 'create:brass_casing',
    T: 'create:transmitter'
  }).id('kubejs:radar/data_link')

  // --- Monitor (mechanical crafting — CRT display array) ---
  if (PG) {
    event.recipes.create.mechanical_crafting(`3x ${RADAR}:monitor`, [
      ' BBB ',
      ' CEC ',
      '  P  '
    ], {
      B: 'create:electron_tube',
      C: 'powergrid:crt',
      E: 'powergrid:circuit_board',
      P: 'create:precision_mechanism'
    }).id('kubejs:radar/monitor')
  } else if (DESTROY) {
    event.recipes.create.mechanical_crafting(`3x ${RADAR}:monitor`, [
      ' BBB ',
      ' BEB ',
      '  P  '
    ], {
      B: 'create:electron_tube',
      E: 'destroy:circuit_board',
      P: 'create:precision_mechanism'
    }).id('kubejs:radar/monitor')
  } else {
    event.recipes.create.mechanical_crafting(`3x ${RADAR}:monitor`, [
      ' BBB ',
      ' B B ',
      '  P  '
    ], {
      B: 'create:electron_tube',
      P: 'create:precision_mechanism'
    }).id('kubejs:radar/monitor')
  }

  // --- Network Controller (mechanical crafting — central processing hub) ---
  if (PG && DESTROY) {
    event.recipes.create.mechanical_crafting(`${RADAR}:network_filterer`, [
      ' DTI ',
      ' C C ',
      '  B  '
    ], {
      D: `${RADAR}:radar_filter_item`,
      T: `${RADAR}:target_filter_item`,
      I: `${RADAR}:ident_filter_item`,
      C: 'powergrid:circuit_board',
      B: 'destroy:stainless_steel_ingot'
    }).id('kubejs:radar/network_filterer')
  } else if (PG) {
    event.recipes.create.mechanical_crafting(`${RADAR}:network_filterer`, [
      ' DTI ',
      ' C C ',
      '  B  '
    ], {
      D: `${RADAR}:radar_filter_item`,
      T: `${RADAR}:target_filter_item`,
      I: `${RADAR}:ident_filter_item`,
      C: 'powergrid:circuit_board',
      B: 'create:brass_casing'
    }).id('kubejs:radar/network_filterer')
  } else if (DESTROY) {
    event.recipes.create.mechanical_crafting(`${RADAR}:network_filterer`, [
      ' DTI ',
      ' B B ',
      '  P  '
    ], {
      D: `${RADAR}:radar_filter_item`,
      T: `${RADAR}:target_filter_item`,
      I: `${RADAR}:ident_filter_item`,
      B: 'destroy:circuit_board',
      P: 'create:precision_mechanism'
    }).id('kubejs:radar/network_filterer')
  } else {
    event.recipes.create.mechanical_crafting(`${RADAR}:network_filterer`, [
      ' DTI ',
      ' B B ',
      '  P  '
    ], {
      D: `${RADAR}:radar_filter_item`,
      T: `${RADAR}:target_filter_item`,
      I: `${RADAR}:ident_filter_item`,
      B: 'create:brass_casing',
      P: 'create:precision_mechanism'
    }).id('kubejs:radar/network_filterer')
  }

  // ==================== WEAPON CONTROL ====================

  // --- Auto Yaw Controller (shaped) ---
  if (PG) {
    event.shaped(`${RADAR}:auto_yaw_controller`, ['B/A'], {
      B: 'powergrid:servo',
      A: 'create:precision_mechanism'
    }).id('kubejs:radar/auto_yaw_controller')
  } else {
    event.shaped(`${RADAR}:auto_yaw_controller`, ['P/G'], {
      P: 'create:precision_mechanism',
      G: 'create:gearbox'
    }).id('kubejs:radar/auto_yaw_controller')
  }

  // --- Auto Pitch Controller (shaped) ---
  if (PG) {
    event.shaped(`${RADAR}:auto_pitch_controller`, ['BG'], {
      B: 'powergrid:servo',
      G: 'create:gearbox'
    }).id('kubejs:radar/auto_pitch_controller')
  } else {
    event.shaped(`${RADAR}:auto_pitch_controller`, ['PG'], {
      P: 'create:precision_mechanism',
      G: 'create:gearbox'
    }).id('kubejs:radar/auto_pitch_controller')
  }

  // --- Fire Controller (shaped — alignment/fire redstone signal) ---
  if (PG) {
    event.shaped(`${RADAR}:fire_controller`, [
      ' R ',
      'CPC',
      ' B '
    ], {
      B: 'create:brass_casing',
      C: 'minecraft:comparator',
      P: 'powergrid:relay',
      R: 'minecraft:redstone'
    }).id('kubejs:radar/fire_controller')
  } else {
    event.shaped(`${RADAR}:fire_controller`, [
      ' R ',
      'CPC',
      ' B '
    ], {
      B: 'create:brass_casing',
      C: 'minecraft:comparator',
      P: 'create:precision_mechanism',
      R: 'minecraft:redstone'
    }).id('kubejs:radar/fire_controller')
  }

  // --- Guided Fuze (shaped — proximity fuze for CBC autocannon) ---
  if (PG && DESTROY) {
    event.shaped(`${RADAR}:guided_fuze`, [
      ' E ',
      'RPR',
      ' C '
    ], {
      E: 'create:electron_tube',
      P: 'powergrid:capacitor',
      R: 'minecraft:redstone',
      C: 'destroy:nitrocellulose'
    }).id('kubejs:radar/guided_fuze')
  } else if (PG) {
    event.shaped(`${RADAR}:guided_fuze`, [
      ' E ',
      'RPR',
      ' R '
    ], {
      E: 'create:electron_tube',
      P: 'powergrid:capacitor',
      R: 'minecraft:redstone'
    }).id('kubejs:radar/guided_fuze')
  } else if (DESTROY) {
    event.shaped(`${RADAR}:guided_fuze`, [
      ' E ',
      'RPR',
      ' N '
    ], {
      E: 'create:electron_tube',
      P: 'create:precision_mechanism',
      R: 'minecraft:redstone',
      N: 'destroy:nitrocellulose'
    }).id('kubejs:radar/guided_fuze')
  } else {
    event.shaped(`${RADAR}:guided_fuze`, [
      ' E ',
      'RPR',
      ' R '
    ], {
      E: 'create:electron_tube',
      P: 'create:precision_mechanism',
      R: 'minecraft:redstone'
    }).id('kubejs:radar/guided_fuze')
  }

  // ==================== IFF & COUNTERMEASURES ====================

  // --- Identification Transponder (shaped — IFF beacon) ---
  if (PG && DESTROY) {
    event.shaped(`${RADAR}:identification_transponder`, [
      ' E ',
      'RBR',
      ' E '
    ], {
      B: 'powergrid:circuit_board',
      E: 'create:electron_tube',
      R: 'create:redstone_link'
    }).id('kubejs:radar/identification_transponder')
  } else {
    event.shaped(`${RADAR}:identification_transponder`, [
      ' E ',
      'RBR',
      ' E '
    ], {
      B: 'create:brass_casing',
      E: 'create:electron_tube',
      R: 'create:redstone_link'
    }).id('kubejs:radar/identification_transponder')
  }

  // --- Radar Warning Receiver (shaped — passive detection alert) ---
  if (PG) {
    event.shaped(`${RADAR}:radar_warning_receiver`, [
      ' D ',
      'PNP',
      ' B '
    ], {
      D: 'powergrid:diode',
      P: '#c:plates/iron',
      N: 'minecraft:note_block',
      B: 'create:electron_tube'
    }).id('kubejs:radar/radar_warning_receiver')
  } else {
    event.shaped(`${RADAR}:radar_warning_receiver`, [
      ' Q ',
      'PNP',
      ' B '
    ], {
      Q: 'create:polished_rose_quartz',
      P: '#c:plates/iron',
      N: 'minecraft:note_block',
      B: 'create:electron_tube'
    }).id('kubejs:radar/radar_warning_receiver')
  }

  // ==================== TOOLS ====================

  // --- Binoculars (shaped) ---
  if (DESTROY) {
    event.shaped(`${RADAR}:binoculars`, [
      'G G',
      'C C',
      ' S '
    ], {
      C: 'destroy:stainless_steel_ingot',
      G: 'minecraft:glass_pane',
      S: 'minecraft:string'
    }).id('kubejs:radar/binoculars')
  } else {
    event.shaped(`${RADAR}:binoculars`, [
      'G G',
      'B B',
      ' S '
    ], {
      B: 'create:brass_ingot',
      G: 'minecraft:glass_pane',
      S: 'minecraft:string'
    }).id('kubejs:radar/binoculars')
  }

  // --- Radar Safe Zone Designator (shaped) ---
  if (PG) {
    event.shaped(`${RADAR}:radar_safe_zone_designator`, [
      ' P ',
      'RCR',
      ' P '
    ], {
      C: 'minecraft:compass',
      P: 'minecraft:paper',
      R: 'powergrid:resistor'
    }).id('kubejs:radar/radar_safe_zone_designator')
  } else {
    event.shaped(`${RADAR}:radar_safe_zone_designator`, [
      ' P ',
      'RCR',
      ' P '
    ], {
      C: 'minecraft:compass',
      P: 'minecraft:paper',
      R: 'minecraft:redstone'
    }).id('kubejs:radar/radar_safe_zone_designator')
  }

  // ==================== FILTER ITEMS (configuration tools) ====================

  // --- Detection Filter ---
  if (PG) {
    event.shaped(`${RADAR}:radar_filter_item`, [
      ' R ',
      'EPE',
      ' R '
    ], {
      R: 'minecraft:redstone',
      E: 'powergrid:diode',
      P: 'minecraft:paper'
    }).id('kubejs:radar/radar_filter_item')
  } else {
    event.shaped(`${RADAR}:radar_filter_item`, [
      ' R ',
      'EPE',
      ' R '
    ], {
      R: 'minecraft:redstone',
      E: 'create:electron_tube',
      P: 'minecraft:paper'
    }).id('kubejs:radar/radar_filter_item')
  }

  // --- Targeting Filter ---
  if (PG) {
    event.shaped(`${RADAR}:target_filter_item`, [
      ' R ',
      'PRP',
      ' R '
    ], {
      R: 'minecraft:redstone',
      P: 'powergrid:potentiometer'
    }).id('kubejs:radar/target_filter_item')
  } else {
    event.shaped(`${RADAR}:target_filter_item`, [
      ' R ',
      'PMP',
      ' R '
    ], {
      R: 'minecraft:redstone',
      P: 'minecraft:paper',
      M: 'create:precision_mechanism'
    }).id('kubejs:radar/target_filter_item')
  }

  // --- Identification Filter ---
  if (PG) {
    event.shaped(`${RADAR}:ident_filter_item`, [
      ' E ',
      'RCR',
      ' P '
    ], {
      E: 'powergrid:integrated_circuit',
      P: 'minecraft:paper',
      R: 'minecraft:redstone',
      C: 'powergrid:capacitor'
    }).id('kubejs:radar/ident_filter_item')
  } else {
    event.shaped(`${RADAR}:ident_filter_item`, [
      ' E ',
      'RPR',
      ' P '
    ], {
      E: 'create:electron_tube',
      P: 'minecraft:paper',
      R: 'minecraft:redstone'
    }).id('kubejs:radar/ident_filter_item')
  }
})

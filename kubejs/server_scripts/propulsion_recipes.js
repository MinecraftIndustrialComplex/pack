if (Platform.isLoaded('createpropulsion')) {
ServerEvents.recipes(event => {
  event.remove({ id: 'createpropulsion:crafting/thruster' })
  event.remove({ id: 'createpropulsion:crafting/ion_thruster' })
  event.remove({ id: 'createpropulsion:crafting/vector_thruster' })
  event.remove({ id: 'createpropulsion:crafting/liquid_vector_thruster' })
  event.remove({ id: 'createpropulsion:crafting/solid_burner' })
  event.remove({ id: 'createpropulsion:crafting/redstone_transmission' })
  event.remove({ id: 'createpropulsion:crafting/redstone_converter' })

  if (!Platform.isLoaded('destroy')) return

  event.custom({
    type: 'create:mechanical_crafting',
    pattern: [
      ' ISSI ',
      'IPFPCI',
      'SPCBPS',
      'IPFPCI',
      ' ISSI '
    ],
    key: {
      I: { tag: 'c:plates/iron' },
      S: { item: 'destroy:stainless_steel_sheet' },
      P: { item: 'create:mechanical_pump' },
      F: { item: 'create:fluid_pipe' },
      C: { item: 'create:copper_casing' },
      B: { item: 'create:brass_casing' }
    },
    result: { id: 'createpropulsion:thruster', count: 1 }
  }).id('kubejs:propulsion/mechanical_thruster')

  event.custom({
    type: 'create:mechanical_crafting',
    pattern: [
      ' SIS ',
      'SABAS',
      'IAPAI',
      'SABAS',
      ' SIS '
    ],
    key: {
      S: { item: 'destroy:stainless_steel_sheet' },
      I: { tag: 'c:plates/iron' },
      A: { tag: 'c:plates/andesite_alloy' },
      B: { item: 'create:chute' },
      P: { item: 'create:fluid_pipe' }
    },
    result: { id: 'createpropulsion:solid_burner', count: 1 }
  }).id('kubejs:propulsion/mechanical_solid_fuel_thruster')

  if (Platform.isLoaded('powergrid')) {
    event.custom({
      type: 'create:mechanical_crafting',
      pattern: [
        ' CEC ',
        'SBRBS',
        'EBMBE',
        'SBRBS',
        ' CEC '
      ],
      key: {
        C: { item: 'powergrid:circuit_board' },
        E: { item: 'create:electron_tube' },
        S: { item: 'destroy:stainless_steel_sheet' },
        B: { item: 'create:brass_casing' },
        R: { item: 'simulated:redstone_accumulator' },
        M: { item: 'powergrid:electric_motor' }
      },
      result: { id: 'createpropulsion:ion_thruster', count: 1 }
    }).id('kubejs:propulsion/mechanical_ion_thruster')

    event.shapeless('createpropulsion:ion_thruster', [
      'createpropulsion:thruster',
      'powergrid:circuit_board',
      'powergrid:electric_motor',
      'powergrid:transformer_core'
    ]).id('kubejs:propulsion/upgrade_thruster_to_ion')

    event.custom({
      type: 'create:mechanical_crafting',
      pattern: [
        ' RRR ',
        'RCRC ',
        'SESES',
        'RCRC ',
        ' RRR '
      ],
      key: {
        R: { item: 'minecraft:redstone' },
        C: { item: 'minecraft:comparator' },
        S: { item: 'destroy:stainless_steel_rod' },
        E: { item: 'powergrid:potentiometer' }
      },
      result: { id: 'createpropulsion:redstone_transmission', count: 1 }
    }).id('kubejs:propulsion/mechanical_redstone_transmission')

    event.custom({
      type: 'create:mechanical_crafting',
      pattern: [
        ' STS ',
        'RAPA ',
        ' SRS '
      ],
      key: {
        S: { item: 'destroy:stainless_steel_rod' },
        T: { item: 'minecraft:redstone_torch' },
        R: { item: 'minecraft:redstone' },
        A: { item: 'powergrid:resistor' },
        P: { tag: 'c:plates/platinum' }
      },
      result: { id: 'createpropulsion:redstone_converter', count: 1 }
    }).id('kubejs:propulsion/mechanical_redstone_converter')
  }

  event.custom({
    type: 'create:mechanical_crafting',
    pattern: [
      '  SGS  ',
      ' STSTS ',
      'STRTRTS',
      'GTRTRTG',
      'STRTRTS',
      ' STSTS ',
      '  SGS  '
    ],
    key: {
      S: { item: 'destroy:stainless_steel_sheet' },
      G: { item: 'simulated:gimbal_sensor' },
      T: { item: 'createpropulsion:thruster' },
      R: { item: 'destroy:stainless_steel_rod' }
    },
    result: { id: 'createpropulsion:liquid_vector_thruster', count: 1 }
  }).id('kubejs:propulsion/mechanical_liquid_vector_thruster')

  event.custom({
    type: 'create:mechanical_crafting',
    pattern: [
      'SSSSSSS',
      'SCPSPCS',
      'SSPSPSS',
      'PNGIGNP',
      'SSPSPSS',
      'SCPSPCS',
      'SSSSSSS'
    ],
    key: {
      S: { item: 'destroy:stainless_steel_sheet' },
      P: { tag: 'c:plates/platinum' },
      I: { item: 'createpropulsion:ion_thruster' },
      C: { item: 'powergrid:circuit_board' },
      N: { tag: 'c:nuggets/platinum' },
      G: { item: 'simulated:gimbal_sensor' }
    },
    result: { id: 'createpropulsion:vector_thruster', count: 1 }
  }).id('kubejs:propulsion/mechanical_vector_thruster')

})}

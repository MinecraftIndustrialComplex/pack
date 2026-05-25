const LSO = 'legendarysurvivaloverhaul'
const CB = 'cobblemon'

ServerEvents.recipes(e => {
  const removeOutputs = [
    `${LSO}:healing_herbs`,
    `${LSO}:plaster`,
    `${LSO}:bandage`,
    `${LSO}:tonic`,
    `${LSO}:medkit`,
    `${LSO}:morphine`,
    `${LSO}:cooling_coat_1`,
    `${LSO}:cooling_coat_2`,
    `${LSO}:cooling_coat_3`,
    `${LSO}:heating_coat_1`,
    `${LSO}:heating_coat_2`,
    `${LSO}:heating_coat_3`,
    `${LSO}:thermal_coat_1`,
    `${LSO}:thermal_coat_2`,
    `${LSO}:thermal_coat_3`,
    `${LSO}:cold_string`,
    `${LSO}:warm_string`,
  ]
  removeOutputs.forEach(id => e.remove({ output: id }))

  // Cobblemon herbs → healing items
  e.shapeless(`${LSO}:healing_herbs`, [`${CB}:big_root`])
    .id('kubejs:lso/healing_herbs')

  e.shaped(`${LSO}:plaster`, [
    ' P ',
    ' H ',
    ' P '
  ], {
    P: 'minecraft:paper',
    H: `${CB}:revival_herb`
  }).id('kubejs:lso/plaster')

  e.shapeless(`${LSO}:bandage`, [
    `${LSO}:plaster`,
    'minecraft:string',
    `${CB}:pecha_berry`
  ]).id('kubejs:lso/bandage')

  e.shapeless(`${LSO}:tonic`, [
    'minecraft:glass_bottle',
    `${CB}:oran_berry`,
    'minecraft:potion{Potion:"minecraft:water"}'
  ]).id('kubejs:lso/tonic')

  e.shaped(`${LSO}:medkit`, [
    'IB',
    'TS'
  ], {
    I: 'minecraft:iron_ingot',
    B: `${LSO}:bandage`,
    T: `${LSO}:tonic`,
    S: `${CB}:sitrus_berry`
  }).id('kubejs:lso/medkit')

  e.shapeless(`${LSO}:morphine`, [
    'minecraft:glass_bottle',
    'minecraft:redstone',
    `${CB}:energy_root`
  ]).id('kubejs:lso/morphine')

  // Temperature coats
  e.shaped(`${LSO}:cooling_coat_1`, [
    'RR',
    'RR'
  ], { R: `${CB}:rawst_berry` })
    .id('kubejs:lso/cooling_coat_1')

  e.shapeless(`${LSO}:cooling_coat_2`, [
    `${LSO}:cooling_coat_1`,
    `${CB}:rawst_berry`,
    `${CB}:rawst_berry`
  ]).id('kubejs:lso/cooling_coat_2')

  e.shapeless(`${LSO}:cooling_coat_3`, [
    `${LSO}:cooling_coat_2`,
    `${CB}:pep_up_flower`,
    'destroy:nylon'
  ]).id('kubejs:lso/cooling_coat_3')

  e.shaped(`${LSO}:heating_coat_1`, [
    'AA',
    'AA'
  ], { A: `${CB}:aspear_berry` })
    .id('kubejs:lso/heating_coat_1')

  e.shapeless(`${LSO}:heating_coat_2`, [
    `${LSO}:heating_coat_1`,
    `${CB}:aspear_berry`,
    `${CB}:aspear_berry`
  ]).id('kubejs:lso/heating_coat_2')

  e.shapeless(`${LSO}:heating_coat_3`, [
    `${LSO}:heating_coat_2`,
    `${CB}:lum_berry`,
    'destroy:nylon'
  ]).id('kubejs:lso/heating_coat_3')

  e.shapeless(`${LSO}:thermal_coat_1`, [
    `${LSO}:cooling_coat_1`,
    `${LSO}:heating_coat_1`
  ]).id('kubejs:lso/thermal_coat_1')

  e.shapeless(`${LSO}:thermal_coat_2`, [
    `${LSO}:thermal_coat_1`,
    `${LSO}:cooling_coat_2`,
    `${LSO}:heating_coat_2`
  ]).id('kubejs:lso/thermal_coat_2')

  e.shapeless(`${LSO}:thermal_coat_3`, [
    `${LSO}:thermal_coat_2`,
    `${LSO}:cooling_coat_3`,
    `${LSO}:heating_coat_3`,
    'destroy:nylon',
    'destroy:nylon'
  ]).id('kubejs:lso/thermal_coat_3')

})

// Potion brewing
if (Platform.isLoaded('morejs')) {
  MoreJS.registerPotionBrewing(event => {
    ;[`${LSO}:sun_fern_leaf`, `${LSO}:ice_fern_leaf`, `${LSO}:sun_fern_gold_leaf`, `${LSO}:ice_fern_gold_leaf`].forEach(id => {
      event.removePotionBrewing({ ingredient: id })
    })

    event.addPotionBrewing(`${CB}:rawst_berry`, 'minecraft:awkward', `${LSO}:heat_resistance`)
    event.addPotionBrewing(`${CB}:aspear_berry`, 'minecraft:awkward', `${LSO}:cold_resistance`)
    event.addPotionBrewing(`${CB}:pep_up_flower`, `${LSO}:heat_resistance`, `${LSO}:heat_immunity`)
    event.addPotionBrewing(`${CB}:lum_berry`, `${LSO}:cold_resistance`, `${LSO}:cold_immunity`)
  })
}

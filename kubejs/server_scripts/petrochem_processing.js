ServerEvents.recipes(e => {
  function allExist(ids) {
    for (var i = 0; i < ids.length; i++) { if (!moleculeExists(ids[i])) return false }
    return true
  }

  function mixture(amount, key, contents) {
    return {
      amount: amount,
      id: 'destroy:mixture',
      components: {
        'destroy:mixture': {
          TranslationKey: key,
          Contents: contents
        }
      }
    }
  }

  const PETROCHEM_MOLECULES = [
    'kubejs:isopentane', 'kubejs:isohexane', 'kubejs:isooctane', 'kubejs:heptane', 'kubejs:propane', 'kubejs:butane',
    'kubejs:hexadecane', 'kubejs:decane', 'kubejs:hydrogen_sulfide',
    'kubejs:pentane', 'kubejs:hexane', 'kubejs:octane', 'kubejs:nonane', 'kubejs:cyclohexane',
    'kubejs:undecane', 'kubejs:dodecane', 'kubejs:tetradecane', 'kubejs:eicosane'
  ]

  if (!allExist(PETROCHEM_MOLECULES)) return
  e.custom({
    type: 'destroy:electrolysis',
    ingredients: [
      { type: 'destroy:mixture_with_molecule', amount: 100, molecule: 'destroy:water', min_concentration: 50.0 }
    ],
    results: [
      mixture(67, 'mixture.kubejs.hydrogen_stream', [
        { Molecule: 'destroy:hydrogen', Concentration: 35.0 }
      ]),
      mixture(33, 'mixture.kubejs.oxygen_stream', [
        { Molecule: 'destroy:oxygen', Concentration: 17.5 }
      ])
    ],
    processing_time: 200
  }).id('kubejs:electrolysis/water_to_hydrogen')
})

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
    'mic_petrochem:isopentane', 'mic_petrochem:isohexane', 'mic_petrochem:isooctane', 'mic_petrochem:heptane', 'mic_petrochem:propane', 'mic_petrochem:butane',
    'mic_petrochem:hexadecane', 'mic_petrochem:decane', 'mic_petrochem:hydrogen_sulfide',
    'mic_petrochem:pentane', 'mic_petrochem:hexane', 'mic_petrochem:octane', 'mic_petrochem:nonane', 'mic_petrochem:cyclohexane',
    'mic_petrochem:undecane', 'mic_petrochem:dodecane', 'mic_petrochem:tetradecane', 'mic_petrochem:eicosane'
  ]

  if (!allExist(PETROCHEM_MOLECULES)) return
  e.custom({
    type: 'destroy:electrolysis',
    ingredients: [
      { type: 'destroy:mixture_with_molecule', amount: 100, molecule: 'destroy:water', min_concentration: 50.0 }
    ],
    results: [
      mixture(67, 'mixture.mic_petrochem.hydrogen_stream', [
        { Molecule: 'destroy:hydrogen', Concentration: 35.0 }
      ]),
      mixture(33, 'mixture.mic_petrochem.oxygen_stream', [
        { Molecule: 'destroy:oxygen', Concentration: 17.5 }
      ])
    ],
    processing_time: 200
  }).id('kubejs:electrolysis/water_to_hydrogen')
})

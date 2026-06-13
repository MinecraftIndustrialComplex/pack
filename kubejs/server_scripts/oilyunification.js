ServerEvents.recipes(e => {
  e.remove({ type: 'createdieselgenerators:distillation' });
  e.remove({ id: 'destroy:distillation/crude_oil' });

  function _allExist(ids) {
    for (var i = 0; i < ids.length; i++) { if (!moleculeExists(ids[i])) return false }
    return true
  }

  if (_allExist([
    'kubejs:pentane', 'kubejs:hexane', 'kubejs:cyclohexane',
    'kubejs:heptane', 'kubejs:octane', 'kubejs:nonane',
    'kubejs:decane', 'kubejs:undecane', 'kubejs:dodecane', 'kubejs:naphthalene',
    'kubejs:tetradecane', 'kubejs:hexadecane', 'kubejs:octadecane', 'kubejs:hydrogen_sulfide',
    'kubejs:eicosane'
  ])) {
    e.custom({
      type: 'destroy:distillation',
      ingredients: [
        { type: 'neoforge:tag', tag: 'c:crude_oil', amount: 100 }
      ],
      results: [
        {
          amount: 20,
          id: 'destroy:mixture',
          components: {
            'destroy:mixture': {
              TranslationKey: 'mixture.kubejs.light_naphtha',
              Temperature: 388,
              Contents: [
                { Molecule: 'kubejs:pentane', Concentration: 5.0 },
                { Molecule: 'kubejs:hexane', Concentration: 4.0 },
                { Molecule: 'kubejs:cyclohexane', Concentration: 2.0 }
              ]
            }
          }
        },
        {
          amount: 25,
          id: 'destroy:mixture',
          components: {
            'destroy:mixture': {
              TranslationKey: 'mixture.kubejs.heavy_naphtha',
              Temperature: 388,
              Contents: [
                { Molecule: 'kubejs:heptane', Concentration: 3.0 },
                { Molecule: 'kubejs:octane', Concentration: 3.0 },
                { Molecule: 'kubejs:nonane', Concentration: 2.0 },
                { Molecule: 'kubejs:cyclohexane', Concentration: 2.0 }
              ]
            }
          }
        },
        {
          amount: 12,
          id: 'destroy:mixture',
          components: {
            'destroy:mixture': {
              TranslationKey: 'mixture.kubejs.raw_kerosene',
              Temperature: 388,
              Contents: [
                { Molecule: 'kubejs:decane', Concentration: 3.0 },
                { Molecule: 'kubejs:undecane', Concentration: 2.5 },
                { Molecule: 'kubejs:dodecane', Concentration: 2.0 },
                { Molecule: 'kubejs:naphthalene', Concentration: 1.5 }
              ]
            }
          }
        },
        {
          amount: 23,
          id: 'destroy:mixture',
          components: {
            'destroy:mixture': {
              TranslationKey: 'mixture.kubejs.raw_diesel',
              Temperature: 388,
              Contents: [
                { Molecule: 'kubejs:tetradecane', Concentration: 3.0 },
                { Molecule: 'kubejs:hexadecane', Concentration: 2.5 },
                { Molecule: 'kubejs:octadecane', Concentration: 1.5 },
                { Molecule: 'kubejs:hydrogen_sulfide', Concentration: 0.5 }
              ]
            }
          }
        },
        {
          amount: 20,
          id: 'destroy:mixture',
          components: {
            'destroy:mixture': {
              TranslationKey: 'mixture.kubejs.long_residue',
              Temperature: 388,
              Contents: [
                { Molecule: 'kubejs:eicosane', Concentration: 6.0 }
              ]
            }
          }
        }
      ],
      heat_requirement: 'heated'
    }).id('kubejs:distillation/crude_oil')

    // D1b: Vacuum Distillation Unit — atmospheric long residue → VGO + vacuum bottoms
    e.custom({
      type: 'destroy:distillation',
      ingredients: [
        { type: 'destroy:mixture_with_molecule', amount: 100, molecule: 'kubejs:eicosane', min_concentration: 5.0 }
      ],
      results: [
        {
          amount: 75,
          id: 'destroy:mixture',
          components: {
            'destroy:mixture': {
              TranslationKey: 'mixture.kubejs.vacuum_gas_oil',
              Temperature: 388,
              Contents: [
                { Molecule: 'kubejs:tetradecane', Concentration: 3.0 },
                { Molecule: 'kubejs:hexadecane', Concentration: 2.5 },
                { Molecule: 'kubejs:octadecane', Concentration: 1.5 }
              ]
            }
          }
        },
        {
          amount: 25,
          id: 'destroy:mixture',
          components: {
            'destroy:mixture': {
              TranslationKey: 'mixture.kubejs.long_residue',
              Temperature: 388,
              Contents: [
                { Molecule: 'kubejs:eicosane', Concentration: 6.0 }
              ]
            }
          }
        }
      ],
      heat_requirement: 'heated'
    }).id('kubejs:distillation/vacuum_distillation')
  }

  const removeItems = [
    "createdieselgenerators:distillation_controller",
    "createdieselgenerators:bulk_fermenter",
    "destroy:seismometer",
    "destroy:pumpjack",
  ];
  removeItems.forEach(id => e.remove({ output: id }));

  const removeFluids = [
    "createdieselgenerators:plant_oil",
    "createdieselgenerators:crude_oil",
    "createdieselgenerators:biodiesel",
    "createdieselgenerators:ethanol",
  ];
  removeFluids.forEach(id => e.remove({ output: Fluid.of(id, 1) }));

  const removeBuckets = [
    "createdieselgenerators:plant_oil_bucket",
    "createdieselgenerators:crude_oil_bucket",
    "createdieselgenerators:biodiesel_bucket",
    "createdieselgenerators:ethanol_bucket",
  ];
  removeBuckets.forEach(id => e.remove({ output: id }));
});

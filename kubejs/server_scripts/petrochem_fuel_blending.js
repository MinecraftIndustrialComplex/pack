ServerEvents.recipes(e => {
  // My hatred of this script cannot be put into words.
  // There is no way to do this through a mixing recipe, so I have had to create the worst possible way of going about this.

  function allExist(ids) {
    for (var i = 0; i < ids.length; i++) { if (!moleculeExists(ids[i])) return false }
    return true
  }

  var MOLECULES = [
    'kubejs:isopentane', 'kubejs:isohexane', 'kubejs:isooctane',
    'kubejs:pentane', 'kubejs:hexane', 'kubejs:heptane', 'kubejs:octane',
    'kubejs:decane', 'kubejs:undecane', 'kubejs:dodecane',
    'kubejs:tetradecane', 'kubejs:hexadecane', 'kubejs:octadecane'
  ]
  if (!allExist(MOLECULES)) return

  function mix(molecule, min, max, amount) {
    return {
      type: 'destroy:mixture_with_molecule',
      amount: amount || 250,
      molecule: molecule,
      min_concentration: min,
      max_concentration: max
    }
  }

  function fillStep(transitional, molecule, min, max, amount) {
    return {
      type: 'create:filling',
      ingredients: [
        { item: transitional },
        mix(molecule, min, max, amount)
      ],
      results: [{ id: transitional }]
    }
  }

  e.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'minecraft:bucket' },
    loops: 1,
    results: [{ chance: 100.0, id: 'kubejs:premium_gasoline_bucket' }],
    sequence: [
      fillStep('kubejs:incomplete_premium_gasoline_bucket', 'kubejs:isopentane', 2.5, 3.5),
      fillStep('kubejs:incomplete_premium_gasoline_bucket', 'kubejs:isohexane', 2.0, 3.0),
      fillStep('kubejs:incomplete_premium_gasoline_bucket', 'kubejs:isooctane', 5.0, 7.0),
    ],
    transitional_item: { id: 'kubejs:incomplete_premium_gasoline_bucket' }
  }).id('kubejs:sequenced_assembly/gasoline_premium')

  e.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'minecraft:bucket' },
    loops: 1,
    results: [{ chance: 100.0, id: 'createdieselgenerators:gasoline_bucket' }],
    sequence: [
      fillStep('kubejs:incomplete_standard_gasoline_bucket', 'kubejs:isopentane', 2.5, 3.5),
      fillStep('kubejs:incomplete_standard_gasoline_bucket', 'kubejs:isohexane', 2.0, 3.0),
      fillStep('kubejs:incomplete_standard_gasoline_bucket', 'kubejs:pentane', 1.5, 2.5),
      fillStep('kubejs:incomplete_standard_gasoline_bucket', 'kubejs:hexane', 1.5, 2.5),
      fillStep('kubejs:incomplete_standard_gasoline_bucket', 'kubejs:heptane', 1.5, 2.5),
      fillStep('kubejs:incomplete_standard_gasoline_bucket', 'kubejs:octane', 0.5, 1.5),
      fillStep('kubejs:incomplete_standard_gasoline_bucket', 'kubejs:isooctane', 2.5, 3.5)
    ],
    transitional_item: { id: 'kubejs:incomplete_standard_gasoline_bucket' }
  }).id('kubejs:sequenced_assembly/gasoline_standard')

  // ============================================================
  // M3: Cheap Cracked Gasoline (Isomerate + Cracked Gasoline)
  // ============================================================
  e.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'minecraft:bucket' },
    loops: 1,
    results: [{ chance: 100.0, id: 'kubejs:cheap_gasoline_bucket' }],
    sequence: [
      fillStep('kubejs:incomplete_cheap_gasoline_bucket', 'kubejs:isopentane', 2.5, 3.5),
      fillStep('kubejs:incomplete_cheap_gasoline_bucket', 'kubejs:isohexane', 2.0, 3.0),
      fillStep('kubejs:incomplete_cheap_gasoline_bucket', 'kubejs:isooctane', 1.0, 2.0),
      fillStep('kubejs:incomplete_cheap_gasoline_bucket', 'kubejs:pentane', 1.5, 2.5),
      fillStep('kubejs:incomplete_cheap_gasoline_bucket', 'kubejs:hexane', 1.5, 2.5),
      fillStep('kubejs:incomplete_cheap_gasoline_bucket', 'kubejs:heptane', 1.5, 2.5),
      fillStep('kubejs:incomplete_cheap_gasoline_bucket', 'kubejs:octane', 0.5, 1.5)
    ],
    transitional_item: { id: 'kubejs:incomplete_cheap_gasoline_bucket' }
  }).id('kubejs:sequenced_assembly/gasoline_cracked')

  e.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'minecraft:bucket' },
    loops: 1,
    results: [{ chance: 100.0, id: 'createdieselgenerators:diesel_bucket' }],
    sequence: [
      fillStep('kubejs:incomplete_diesel_bucket', 'kubejs:tetradecane', 2.5, 3.5),
      fillStep('kubejs:incomplete_diesel_bucket', 'kubejs:hexadecane', 2.0, 3.0),
      fillStep('kubejs:incomplete_diesel_bucket', 'kubejs:octadecane', 1.0, 2.0)
    ],
    transitional_item: { id: 'kubejs:incomplete_diesel_bucket' }
  }).id('kubejs:sequenced_assembly/diesel_from_hydrotreating')

  e.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'minecraft:bucket' },
    loops: 1,
    results: [{ chance: 100.0, id: 'createdieselgenerators:diesel_bucket' }],
    sequence: [
      fillStep('kubejs:incomplete_cracked_diesel_bucket', 'kubejs:decane', 1.5, 2.5),
      fillStep('kubejs:incomplete_cracked_diesel_bucket', 'kubejs:tetradecane', 0.5, 1.5),
      fillStep('kubejs:incomplete_cracked_diesel_bucket', 'kubejs:tetradecane', 2.5, 3.5),
      fillStep('kubejs:incomplete_cracked_diesel_bucket', 'kubejs:hexadecane', 2.0, 3.0),
      fillStep('kubejs:incomplete_cracked_diesel_bucket', 'kubejs:octadecane', 1.0, 2.0)
    ],
    transitional_item: { id: 'kubejs:incomplete_cracked_diesel_bucket' }
  }).id('kubejs:sequenced_assembly/cracked_diesel_blend')

  e.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'minecraft:bucket' },
    loops: 1,
    results: [{ chance: 100.0, id: 'kubejs:kerosene_bucket' }],
    sequence: [
      fillStep('kubejs:incomplete_kerosene_bucket', 'kubejs:decane', 2.5, 3.5),
      fillStep('kubejs:incomplete_kerosene_bucket', 'kubejs:undecane', 2.0, 3.0),
      fillStep('kubejs:incomplete_kerosene_bucket', 'kubejs:dodecane', 1.5, 2.5)
    ],
    transitional_item: { id: 'kubejs:incomplete_kerosene_bucket' }
  }).id('kubejs:sequenced_assembly/kerosene_from_hydrotreating')
})

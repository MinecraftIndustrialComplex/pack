const PG = 'powergrid'

ServerEvents.recipes(event => {
  if (!Platform.isLoaded('powergrid') || !Platform.isLoaded('destroy')) return

  event.remove({ id: `${PG}:mixing/acid` })
  event.remove({ id: `${PG}:mixing/etched_circuit_board` })
  event.remove({ id: `${PG}:sequenced_assembly/battery` })

  const SULFURIC_ACID_MIXTURE = {
    type: 'destroy:mixture_with_molecule',
    amount: 250,
    molecule: 'destroy:sulfuric_acid',
    min_concentration: 4.0,
    max_concentration: 5.0
  }

  event.custom({
    type: 'create:mixing',
    heat_requirement: 'heated',
    ingredients: [
      { item: `${PG}:unetched_circuit` },
      SULFURIC_ACID_MIXTURE
    ],
    results: [
      { id: `${PG}:incomplete_circuit` }
    ]
  }).id('kubejs:mixing/etch_circuit')

  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: `${PG}:conductive_casing` },
    loops: 3,
    results: [
      { chance: 100.0, id: `${PG}:battery` },
      { chance: 5.0, id: `${PG}:conductive_casing` },
      { chance: 2.0, id: 'create:copper_sheet' },
      { chance: 2.0, id: `${PG}:zinc_sheet` }
    ],
    sequence: [
      {
        type: 'create:deploying',
        ingredients: [
          { item: `${PG}:incomplete_battery` },
          { tag: 'c:ingots/lead' }
        ],
        results: [{ id: `${PG}:incomplete_battery` }]
      },
      {
        type: 'create:deploying',
        ingredients: [
          { item: `${PG}:incomplete_battery` },
          { tag: 'c:plates/zinc' }
        ],
        results: [{ id: `${PG}:incomplete_battery` }]
      },
      {
        type: 'create:filling',
        ingredients: [
          { item: `${PG}:incomplete_battery` },
          SULFURIC_ACID_MIXTURE
        ],
        results: [{ id: `${PG}:incomplete_battery` }]
      }
    ],
    transitional_item: { id: `${PG}:incomplete_battery` }
  }).id('kubejs:sequenced_assembly/battery')
})

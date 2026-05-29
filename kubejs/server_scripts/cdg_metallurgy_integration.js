ServerEvents.recipes(e => {
  e.remove({ id: 'createdieselgenerators:mechanical_crafting/pumpjack_crank' })
  e.custom({
    type: 'create:mechanical_crafting',
    pattern: [
      "AIA",
      " S ",
      "AIA",
      "ZSZ",
      "AZA"
    ],
    key: {
      A: { item: 'create:andesite_alloy' },
      Z: { tag: 'forge:ingots/zinc' },
      I: { tag: 'forge:plates/steel' },
      S: { item: 'create:shaft' }
    },
    result: { id: 'createdieselgenerators:pumpjack_crank' }
  }).id('kubejs:mechanical_crafting/pumpjack_crank')
})

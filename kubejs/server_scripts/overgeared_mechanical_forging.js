// requires: overgeared
// requires: create
ServerEvents.recipes(e => {
  if (!Platform.isLoaded('overgeared') || !Platform.isLoaded('create')) return

  e.forEachRecipe({ type: 'overgeared:forging' }, r => {
    const json = JSON.parse(r.json.toString())
    if (!json.pattern || !json.key || !json.result) return

    const id = String(r.getId()) // e.g. overgeared:copper_axe_head

    e.custom({
      type: 'create:mechanical_crafting',
      pattern: json.pattern,
      key: json.key,
      result: json.result,
      acceptMirrored: false
    }).id(`kubejs:mechanical_crafting/${id.replace(':', '/')}`)
  })
})

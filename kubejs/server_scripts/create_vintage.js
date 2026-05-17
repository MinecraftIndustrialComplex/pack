// Create: Vintage belt grinder removed; polishing moved to Create Metallurgy mechanical belt grinder.

ServerEvents.recipes(e => {
  const voidedOutputs = [
    'createvintageneoforged:belt_grinder',
    'createvintageneoforged:grinder_belt'
  ]
  voidedOutputs.forEach(id => e.remove({ output: id }))

  e.remove({ id: 'createvintageneoforged:grinder_polishing/w_shaped_curving_head' })
  e.remove({ id: 'createvintageneoforged:grinder_polishing/rose_quartz' })
  e.remove({ type: 'createvintageneoforged:polishing' })

  e.recipes.createmetallurgy
    .grinding('#c:storage_blocks/iron', 'createvintageneoforged:w_shaped_curving_head')
    .processingTime(100)
    .id('kubejs:vintage/w_shaped_curving_head_from_iron_block')
})

// Integrations between Create Big Cannons and Destroy
//
// 1. Guncotton replaced by Destroy nitrocellulose (guncotton voided in startup)
// 2. Destroy secondary explosives as CBC HE shell materials
// 3. Destroy rigid plastics as inexpensive cartridge sheet materials
// 4. Destroy lead as alternative shot material

ServerEvents.recipes(e => {
  e.remove({ id: 'createbigcannons:mixing/guncotton' })

  if (Platform.isLoaded('destroy')) {
    // Autocannon cartridge sheets from rigid plastics (polymer-cased ammunition)
    e.recipes.create.cutting('3x createbigcannons:autocannon_cartridge_sheet', '#destroy:plastics/rigid')
      .id('kubejs:cbc/plastic_to_autocannon_cartridge_sheet')

    // Inexpensive big cartridge sheet from rigid plastics
    e.shaped('1x createbigcannons:big_cartridge_sheet', ['PP', 'PP'], { P: '#destroy:plastics/rigid' })
      .id('kubejs:cbc/plastic_to_big_cartridge_sheet')

    // Lead shot balls (more realistic than iron shot)
    e.shaped('2x createbigcannons:shot_balls', ['iii', 'iIi', 'iii'], {
        I: '#c:ingots/lead',
        i: '#c:nuggets/lead'
      }).id('kubejs:cbc/lead_shot_balls')
  }
})

ServerEvents.tags('item', e => {
  if (Platform.isLoaded('destroy')) {
    // Replace guncotton with nitrocellulose in CBC's guncotton tag
    e.remove('createbigcannons:guncotton', 'createbigcannons:guncotton')
    e.add('createbigcannons:guncotton', 'destroy:nitrocellulose')

    // Nitrocellulose can be used as nitration feedstock
    e.add('createbigcannons:can_be_nitrated', 'destroy:nitrocellulose')

    // Nitrocellulose is a Destroy secondary explosive
    e.add('destroy:explosives/secondary', 'destroy:nitrocellulose')

    // Destroy secondary explosives can be used in CBC HE/AP shell crafting
    e.add('createbigcannons:high_explosive_materials', '#destroy:explosives/secondary')
  }
})

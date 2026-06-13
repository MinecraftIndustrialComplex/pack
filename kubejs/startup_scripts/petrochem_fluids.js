StartupEvents.registry('fluid', event => {
  event.create('kerosene', 'thin')
    .displayName('Kerosene')
    .tint(0xC8D4E8)
    .type(type => type
      .stillTexture('createdieselgenerators:block/diesel_still')
      .flowingTexture('createdieselgenerators:block/diesel_flow')
      .density(780)
      .viscosity(800)
      .temperature(300)
    )

  event.create('premium_gasoline', 'thin')
    .displayName('Premium Gasoline')
    .tint(0x99ff99) // Light green tint
    .type(type => type
      .stillTexture('createdieselgenerators:block/gasoline_still')
      .flowingTexture('createdieselgenerators:block/gasoline_flow')
      .density(740)
      .viscosity(600)
      .temperature(300)
    )

  event.create('cheap_gasoline', 'thin')
    .displayName('Cheap Gasoline')
    .tint(0xffcc99) // Orange/brownish tint
    .type(type => type
      .stillTexture('createdieselgenerators:block/gasoline_still')
      .flowingTexture('createdieselgenerators:block/gasoline_flow')
      .density(760)
      .viscosity(650)
      .temperature(300)
    )
})

StartupEvents.registry('fluid', event => {
  event.create('molten_chromium', 'thin')
    .displayName('Molten Chromium')
    .tint(0x8899CC)
    .type(type => type
      .stillTexture('createmetallurgy:fluid/silver/still')
      .flowingTexture('createmetallurgy:fluid/silver/flowing')
      .lightLevel(15)
      .density(2000)
      .viscosity(2000)
      .temperature(1907)
    )
})

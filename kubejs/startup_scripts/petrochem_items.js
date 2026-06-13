StartupEvents.registry('item', e => {
  e.create('petroleum_coke').displayName('Petroleum Coke')

  // Sequenced assembly transitional items for fuel blending
  e.create('incomplete_premium_gasoline_bucket').displayName('Incomplete Premium Gasoline Bucket').texture('layer0', 'minecraft:item/bucket')
  e.create('incomplete_standard_gasoline_bucket').displayName('Incomplete Standard Gasoline Bucket').texture('layer0', 'minecraft:item/bucket')
  e.create('incomplete_cheap_gasoline_bucket').displayName('Incomplete Cheap Gasoline Bucket').texture('layer0', 'minecraft:item/bucket')
  e.create('incomplete_diesel_bucket').displayName('Incomplete Diesel Bucket').texture('layer0', 'minecraft:item/bucket')
  e.create('incomplete_cracked_diesel_bucket').displayName('Incomplete Cracked Diesel Bucket').texture('layer0', 'minecraft:item/bucket')
  e.create('incomplete_kerosene_bucket').displayName('Incomplete Kerosene Bucket').texture('layer0', 'minecraft:item/bucket')
})

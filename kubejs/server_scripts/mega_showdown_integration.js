ServerEvents.recipes(event => {
  if (!Platform.isLoaded('destroy')) return

  event.remove({ output: 'mega_showdown:mega_ring' })
  event.shaped('mega_showdown:mega_ring', [' S ', 'SKS', ' S '], {
    S: 'destroy:stainless_steel_ingot',
    K: 'mega_showdown:keystone'
  }).id('kubejs:mega_showdown/mega_ring')

  event.remove({ output: 'mega_showdown:mega_bracelet' })
  event.shaped('mega_showdown:mega_bracelet', ['S S', ' K ', 'S S'], {
    S: 'destroy:stainless_steel_ingot',
    K: 'mega_showdown:keystone'
  }).id('kubejs:mega_showdown/mega_bracelet')

  const colors = [
    ['black', 'minecraft:black_dye'],
    ['blue', 'minecraft:blue_dye'],
    ['green', 'minecraft:green_dye'],
    ['pink', 'minecraft:pink_dye'],
    ['red', 'minecraft:red_dye'],
    ['yellow', 'minecraft:yellow_dye']
  ]
  colors.forEach(([color, dye]) => {
    event.remove({ output: `mega_showdown:mega_bracelet_${color}` })
    event.shaped(`mega_showdown:mega_bracelet_${color}`, ['SDS', ' K ', 'S S'], {
      S: 'destroy:stainless_steel_ingot',
      K: 'mega_showdown:keystone',
      D: dye
    }).id(`kubejs:mega_showdown/mega_bracelet_${color}`)
  })

  event.remove({ output: 'mega_showdown:brendan_mega_cuff' })
  event.shaped('mega_showdown:brendan_mega_cuff', ['L L', ' K ', 'S S'], {
    S: 'destroy:stainless_steel_ingot',
    K: 'mega_showdown:keystone',
    L: 'minecraft:leather'
  }).id('kubejs:mega_showdown/brendan_mega_cuff')

  event.remove({ output: 'mega_showdown:lysandre_ring' })
  event.shaped('mega_showdown:lysandre_ring', [' R ', 'SKS', ' S '], {
    S: 'destroy:stainless_steel_ingot',
    K: 'mega_showdown:keystone',
    R: 'minecraft:redstone'
  }).id('kubejs:mega_showdown/lysandre_ring')

  event.remove({ output: 'mega_showdown:korrina_glove' })
  event.shaped('mega_showdown:korrina_glove', [' S ', 'LKL', ' L '], {
    S: 'destroy:stainless_steel_ingot',
    K: 'mega_showdown:keystone',
    L: 'minecraft:leather'
  }).id('kubejs:mega_showdown/korrina_glove')

  event.remove({ output: 'mega_showdown:maxie_glasses' })
  event.shaped('mega_showdown:maxie_glasses', ['S S', ' K ', 'G G'], {
    S: 'destroy:stainless_steel_ingot',
    K: 'mega_showdown:keystone',
    G: 'minecraft:glass_pane'
  }).id('kubejs:mega_showdown/maxie_glasses')

  event.remove({ output: 'mega_showdown:archie_anchor' })
  event.shaped('mega_showdown:archie_anchor', [' I ', 'SKS', ' S '], {
    S: 'destroy:stainless_steel_ingot',
    K: 'mega_showdown:keystone',
    I: 'minecraft:iron_ingot'
  }).id('kubejs:mega_showdown/archie_anchor')

  event.remove({ output: 'mega_showdown:may_bracelet' })
  event.shaped('mega_showdown:may_bracelet', ['SDS', ' K ', 'S S'], {
    S: 'destroy:stainless_steel_ingot',
    K: 'mega_showdown:keystone',
    D: 'minecraft:red_dye'
  }).id('kubejs:mega_showdown/may_bracelet')

  event.remove({ output: 'mega_showdown:z_ring' })
  event.shaped('mega_showdown:z_ring', [' S ', 'SPS', ' S '], {
    S: 'destroy:stainless_steel_ingot',
    P: 'mega_showdown:sparkling_stone'
  }).id('kubejs:mega_showdown/z_ring')

  event.remove({ output: 'mega_showdown:dynamax_band' })
  event.shaped('mega_showdown:dynamax_band', ['S S', ' W ', 'S S'], {
    S: 'destroy:stainless_steel_ingot',
    W: 'mega_showdown:wishing_star'
  }).id('kubejs:mega_showdown/dynamax_band')

  event.remove({ output: 'mega_showdown:tera_orb' })
  event.shaped('mega_showdown:tera_orb', [' S ', 'STS', ' S '], {
    S: 'destroy:stainless_steel_ingot',
    T: 'mega_showdown:normal_tera_shard'
  }).id('kubejs:mega_showdown/tera_orb')

  event.remove({ output: 'mega_showdown:omni_ring' })
  event.shaped('mega_showdown:omni_ring', ['SZS', 'MDT', 'SNS'], {
    S: 'destroy:stainless_steel_ingot',
    Z: 'mega_showdown:z_ring',
    M: 'mega_showdown:mega_ring',
    D: 'mega_showdown:dynamax_band',
    T: 'mega_showdown:tera_orb',
    N: 'minecraft:netherite_ingot'
  }).id('kubejs:mega_showdown/omni_ring')
})

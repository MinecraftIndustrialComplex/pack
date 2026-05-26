var COLORS = [
  'white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime',
  'pink', 'gray', 'light_gray', 'cyan', 'purple', 'blue',
  'brown', 'green', 'red', 'black'
]

const paintItem = (c) => `create_encapsulated:${c}_paint`
const paintFluid = (c) => `create_encapsulated:${c}_paint`
const dyeItem = (c) => `minecraft:${c}_dye`

const SPECIAL_BALL_RECIPES = [
  'great_ball', 'ultra_ball',
  'fast_ball', 'friend_ball', 'heavy_ball', 'level_ball', 'love_ball',
  'lure_ball', 'moon_ball', 'safari_ball', 'sport_ball', 'park_ball',
  'net_ball', 'nest_ball', 'dive_ball', 'dusk_ball', 'heal_ball',
  'quick_ball', 'repeat_ball', 'timer_ball',
  'luxury_ball', 'dream_ball',
  'ancient_feather_ball', 'ancient_wing_ball', 'ancient_jet_ball',
  'ancient_gigaton_ball', 'ancient_heavy_ball', 'ancient_leaden_ball',
  'ancient_great_ball', 'ancient_ultra_ball',
]

ServerEvents.recipes(event => {
  SPECIAL_BALL_RECIPES.forEach(name => {
    event.remove({ id: `create_encapsulated:poke_balls/${name}` })
    event.remove({ id: `create_encapsulated:poke_balls/${name}_lid` })
  })

  COLORS.forEach(c => {
    event.remove({ type: 'create:mixing', output: { fluid: paintFluid(c) } })
  })

  COLORS.forEach(c => {
    event.remove({ id: `cobblemon:campfire_pot/${c}_paint` })
    event.remove({ id: `cobblemon:campfire_pot/${c}_paint_mix` })
  })
  event.remove({ id: 'cobblemon:campfire_pot/brown_paint_from_yellow' })
  event.remove({ id: 'cobblemon:campfire_pot/brown_paint_from_blueandorange' })
  event.remove({ id: 'cobblemon:campfire_pot/brown_paint_from_redandgreen' })

  event.remove({ type: 'create_encapsulated:paintable' })
  event.remove({ type: 'create_encapsulated:paint_armor_dye' })

  COLORS.forEach(c => {
    event.remove({ type: 'create:filling', input: { fluid: paintFluid(c) } })
  })

  COLORS.forEach(c => {
    event.replaceInput({ mod: 'create_encapsulated' }, paintItem(c), dyeItem(c))
    event.replaceInput({ mod: 'cobblemon' }, paintItem(c), dyeItem(c))
  })
})

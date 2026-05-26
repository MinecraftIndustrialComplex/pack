const COLORS = [
  'white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime',
  'pink', 'gray', 'light_gray', 'cyan', 'purple', 'blue',
  'brown', 'green', 'red', 'black'
]

JEIEvents.hideItems(event => {
  COLORS.forEach(c => event.hide(`create_encapsulated:${c}_paint`))
  event.hide('create_encapsulated:rainbow_paint')
})

JEIEvents.hideFluids(event => {
  COLORS.forEach(c => event.hide(`create_encapsulated:${c}_paint`))
})

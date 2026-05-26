const COLORS = [
  'white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime',
  'pink', 'gray', 'light_gray', 'cyan', 'purple', 'blue',
  'brown', 'green', 'red', 'black'
]

function hidePaintEntries(event) {
  COLORS.forEach(c => event.remove(`create_encapsulated:${c}_paint`))
  event.remove('create_encapsulated:rainbow_paint')
}

if (typeof RecipeViewerEvents !== 'undefined') {
  RecipeViewerEvents.removeEntries('item', hidePaintEntries)
  RecipeViewerEvents.removeEntries('fluid', hidePaintEntries)
}

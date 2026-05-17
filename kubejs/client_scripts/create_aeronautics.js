// Create Aeronautics: remove voided engine recipes from JEI (items hidden in voided_jei.js).
const DYE_COLORS = [
  'white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink',
  'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black'
]

const DYE_ENGINE_RECIPE_IDS = DYE_COLORS.map(function (color) {
  return 'simulated:portable_engine.color/' + color
})

const ENGINE_RECIPE_IDS = [
  'simulated:red_portable_engine',
  'simulated:crafting/portable_engine_dyeing',
  'simulated:sequenced_assembly/engine_assembly'
].concat(DYE_ENGINE_RECIPE_IDS)

function removeEngineRecipes(event) {
  ENGINE_RECIPE_IDS.forEach(function (id) {
    if (id.indexOf('sequenced_assembly') !== -1) {
      event.remove('create:sequenced_assembly', id)
    } else {
      event.remove('minecraft:crafting', id)
    }
  })
}

if (typeof JEIEvents !== 'undefined') {
  JEIEvents.removeRecipes(removeEngineRecipes)
}

if (typeof RecipeViewerEvents !== 'undefined') {
  RecipeViewerEvents.removeRecipes(removeEngineRecipes)
}

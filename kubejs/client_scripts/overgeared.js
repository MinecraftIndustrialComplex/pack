JEIEvents.hideItems(event => {
  // hide anything with "steel" in the id from Overgeared
  event.hide(/overgeared:.*steel.*$/)

  // OR (a bit safer): “anything from overgeared” AND “id contains steel”
  // event.hide(Ingredient.of('@overgeared').and(/steel/))
})

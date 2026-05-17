// Hide voided items and fluids from JEI / REI / EMI (see startup_scripts/voided_content.js).

function collectVoidedItems() {
  const items = (global.VOIDED_ITEMS || []).slice()
  if (Platform.isLoaded('tacz')) {
    items.push.apply(items, global.VOIDED_ITEMS_TACZ || [])
  }
  return items
}

function hideVoidedItems(event) {
  collectVoidedItems().forEach(function (id) {
    event.hide(id)
  })
}

function hideVoidedFluids(event) {
  (global.VOIDED_FLUIDS || []).forEach(function (id) {
    event.hide(id)
  })
}

function removeVoidedItemEntries(event) {
  collectVoidedItems().forEach(function (id) {
    event.remove(id)
  })
  ;(global.VOIDED_ITEM_PATTERNS || []).forEach(function (pattern) {
    event.remove(pattern)
  })
  ;(global.VOIDED_MOD_IDS || []).forEach(function (modId) {
    if (Platform.isLoaded(modId)) {
      event.remove(new RegExp('^' + modId + ':.+'))
    }
  })
}

function removeVoidedFluidEntries(event) {
  (global.VOIDED_FLUIDS || []).forEach(function (id) {
    event.remove(id)
  })
}

if (typeof JEIEvents !== 'undefined') {
  JEIEvents.hideItems(hideVoidedItems)
  JEIEvents.hideFluids(hideVoidedFluids)
}

if (typeof RecipeViewerEvents !== 'undefined') {
  RecipeViewerEvents.removeEntries('item', removeVoidedItemEntries)
  RecipeViewerEvents.removeEntries('fluid', removeVoidedFluidEntries)
}

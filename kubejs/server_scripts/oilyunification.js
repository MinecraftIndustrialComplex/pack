ServerEvents.recipes(e => {
  // Remove recipes for blocks/items you don’t want obtainable
  const removeItems = [
    "createdieselgenerators:distillation_controller",
    "createdieselgenerators:bulk_fermenter",
    "destroy:seismometer",
    "destroy:pumpjack",
  ];
  removeItems.forEach(id => e.remove({ output: id }));

  // If you also want to block CDG fluids, remove recipes that OUTPUT those fluids (any amount)
  const removeFluids = [
    "createdieselgenerators:plant_oil",
    "createdieselgenerators:crude_oil",
    "createdieselgenerators:biodiesel",
    "createdieselgenerators:gasoline",
    "createdieselgenerators:ethanol",
  ];
  removeFluids.forEach(id => e.remove({ output: Fluid.of(id, 1) }));

  // Optional: also remove bucket outputs if they exist in your pack
  const removeBuckets = [
    "createdieselgenerators:plant_oil_bucket",
    "createdieselgenerators:crude_oil_bucket",
    "createdieselgenerators:biodiesel_bucket",
    "createdieselgenerators:gasoline_bucket",
    "createdieselgenerators:ethanol_bucket",
  ];
  removeBuckets.forEach(id => e.remove({ output: id }));
});


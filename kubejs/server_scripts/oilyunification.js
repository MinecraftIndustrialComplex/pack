ServerEvents.recipes(e => {
  e.remove({ type: 'createdieselgenerators:distillation' });

  const removeItems = [
    "createdieselgenerators:distillation_controller",
    "createdieselgenerators:bulk_fermenter",
    "destroy:seismometer",
    "destroy:pumpjack",
  ];
  removeItems.forEach(id => e.remove({ output: id }));

  const removeFluids = [
    "createdieselgenerators:plant_oil",
    "createdieselgenerators:crude_oil",
    "createdieselgenerators:biodiesel",
    "createdieselgenerators:diesel",
    "createdieselgenerators:gasoline",
    "createdieselgenerators:ethanol",
  ];
  removeFluids.forEach(id => e.remove({ output: Fluid.of(id, 1) }));

  const removeBuckets = [
    "createdieselgenerators:plant_oil_bucket",
    "createdieselgenerators:crude_oil_bucket",
    "createdieselgenerators:biodiesel_bucket",
    "createdieselgenerators:diesel_bucket",
    "createdieselgenerators:gasoline_bucket",
    "createdieselgenerators:ethanol_bucket",
  ];
  removeBuckets.forEach(id => e.remove({ output: id }));
});


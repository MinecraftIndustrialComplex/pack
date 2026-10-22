ServerEvents.recipes(e => {
  e.remove({ type: 'createdieselgenerators:distillation' });
  e.remove({ id: 'destroy:distillation/crude_oil' });

// Crude oil and vacuum distillation recipes are provided by the mic-petrochem mod datapack
  // (data/mic_petrochem/recipe/distillation/). Only the defaults need removing here.

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
    // Ethanol is not removed: it is the pre-oil fuel on purpose (OGB-8), poor in engines by its
    // real properties. Its values: kubejs/data/createdieselgenerators/.../fuel_type/ethanol.json
    // and kubejs/data/createpropulsion/thruster_fuels/cdg/cdg_ethanol.json.
  ];
  removeFluids.forEach(id => e.remove({ output: Fluid.of(id, 1) }));

  const removeBuckets = [
    "createdieselgenerators:plant_oil_bucket",
    "createdieselgenerators:crude_oil_bucket",
    "createdieselgenerators:biodiesel_bucket",
  ];
  removeBuckets.forEach(id => e.remove({ output: id }));
});

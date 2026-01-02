JEIEvents.hideItems(e => {
  const hide = [
    "createdieselgenerators:distillation_controller",
    "createdieselgenerators:bulk_fermenter",
    "destroy:seismometer",
    "destroy:pumpjack",

    // Optional: hide buckets if present
    "createdieselgenerators:plant_oil_bucket",
    "createdieselgenerators:crude_oil_bucket",
    "createdieselgenerators:biodiesel_bucket",
    "createdieselgenerators:gasoline_bucket",
    "createdieselgenerators:ethanol_bucket",
  ];
  hide.forEach(id => e.hide(id));
});

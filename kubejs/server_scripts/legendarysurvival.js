ServerEvents.recipes(e => {
  const removeItems = [
	  "legendarysurvivaloverhaul:heart_container"
  ];
  removeItems.forEach(id => e.remove({ output: id }));
});

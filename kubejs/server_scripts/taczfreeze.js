if (Platform.isLoaded('tacz')) {
  ServerEvents.recipes(e => {
    const removeItems = [
      "tacz:gun_smith_table",
      "tacz:workbench_a",
      "tacz:workbench_c",
    ];
    removeItems.forEach(id => {
      try { e.remove({ output: id }) } catch (ex) {}
    });
  });
}

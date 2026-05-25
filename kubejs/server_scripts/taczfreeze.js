if (Platform.isLoaded('tacz')) {
  ServerEvents.recipes(e => {
    const removeItems = [
      "tacz:gun_smith_table",
      "tacz:attachment_workbench",
      "tacz:ammo_workbench",
    ];
    removeItems.forEach(id => {
      try { e.remove({ output: id }) } catch (ex) {}
    });
  });
}

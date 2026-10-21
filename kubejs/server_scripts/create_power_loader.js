// Create Power Loader is one of the pack's removed mods (VOIDED_MOD_IDS in startup_scripts/voided_content.js):
// none of its recipes are craftable. mic_grid_loader's electric chunk loader replaces them.
//
// The whole script sits inside the check, as iceandfire.js does: a bare "return" at the top level is not in a
// function, so Rhino rejects it ("invalid return") and the script never loads.
if (Platform.isLoaded('create_power_loader')) {
  ServerEvents.recipes(event => {
    event.remove({ mod: 'create_power_loader' })
  })
}

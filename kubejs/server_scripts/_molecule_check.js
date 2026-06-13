// Centralized molecule existence checks.
// Underscore prefix ensures this loads before other recipe files.

function moleculeExists(id) {
  if (!Platform.isLoaded('destroy')) return false
  if (id.startsWith('destroy:')) return true
  try {
    var LegacySpecies = Java.loadClass('petrolpark.mc.destroy.chemistry.legacy.LegacySpecies')
    return LegacySpecies.getMolecule(id) != null
  } catch (e) {
    return false
  }
}

// Create Aeronautics: portable engines removed from pack progression.
if (Platform.isLoaded('simulated')) {
  ServerEvents.recipes(event => {
    event.remove({ output: /simulated:\w+_portable_engine/ })
    event.remove({ type: 'simulated:portable_engine_dyeing' })
    event.remove({ id: 'simulated:crafting/portable_engine_dyeing' })
    event.remove({ id: 'simulated:red_portable_engine' })
    event.remove({ id: /simulated:portable_engine\.color\/.+/ })
    event.remove({ id: 'simulated:sequenced_assembly/engine_assembly' })
    event.remove({ output: 'simulated:engine_assembly' })
    event.remove({ output: 'simulated:incomplete_engine_assembly' })
    event.remove({ input: 'simulated:engine_assembly' })
    event.remove({ input: 'simulated:incomplete_engine_assembly' })
  })
}

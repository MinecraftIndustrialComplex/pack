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

    if (Platform.isLoaded('powergrid')) {
      event.remove({ id: 'simulated:redstone_magnet' })
      event.shapeless('simulated:redstone_magnet', [
        'powergrid:magnet', 'powergrid:magnet', 'powergrid:magnet',
        'minecraft:redstone',
        'create:copper_sheet'
      ]).id('kubejs:create_aeronautics/redstone_magnet')
    }
  })
}

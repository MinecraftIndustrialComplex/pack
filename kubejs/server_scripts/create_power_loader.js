if (!Platform.isLoaded('create_power_loader')) return

ServerEvents.recipes(event => {
  event.remove({ mod: 'create_power_loader' })
})

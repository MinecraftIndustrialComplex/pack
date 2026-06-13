// Auto-reload once after world load so custom Destroy molecules are registered
// before KubeJS recipe scripts run that depend on them.
if (!global._autoReloaded) {
  global._autoReloaded = true
  ServerEvents.loaded(event => {
    setTimeout(() => event.server.runCommandSilent('reload'), 0)
  })
}

CreateHeatJS.registerHeatEvent(event => {
  const BH_ID = "powergrid:basin_heater"
  const tempAt = (level, pos) => {
    let state = level.getBlockState(pos)
    if (state.block.id !== BH_ID) return 0
    let be = level.getBlockEntity(pos)
    if (!be) return 0
    try {
      let tag = new (Java.loadClass("net.minecraft.nbt.CompoundTag"))()
      be.saveAdditional(tag, level.registryAccess())
      return tag.getFloat("Temperature")
    } catch(e) {
      return 0
    }
  }

  event.registerHeat("HYPERHEATED", builder => builder
    .color(0xFF0000)
    .addFunctionalHeatSource((level, pos) => tempAt(level, pos) > 1500)
    .satisfies("SUPERHEATED")
  )
})

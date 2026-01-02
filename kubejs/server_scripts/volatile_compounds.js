var volatilecompounds = {
  "minecraft:tnt": 1.0,
  "minecraft:gunpowder": 0.2
}

var max_explosion_strength = 10.0
var DEBUG = false

var DamageTypeTags = Java.loadClass("net.minecraft.tags.DamageTypeTags")
var ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack")
var ExplosionInteraction = Java.loadClass("net.minecraft.world.level.Level$ExplosionInteraction")

function countItem(inv, itemId) {
  var total = 0
  var slots = inv.getSlots()
  for (var i = 0; i < slots; i++) {
    var stack = inv.getStackInSlot(i)
    if (!stack || !stack.getId) continue
    if (stack.getId() === itemId) total += stack.getCount()
  }
  return total
}

function removeAll(inv, itemId) {
  // prefer clear() if present
  try {
    if (typeof inv.clear === "function") {
      inv.clear(itemId)
      return
    }
  } catch (e) {}

  var slots = inv.getSlots()
  for (var i = 0; i < slots; i++) {
    var stack = inv.getStackInSlot(i)
    if (!stack || !stack.getId) continue
    if (stack.getId() === itemId && stack.getCount() > 0) {
      inv.setStackInSlot(i, ItemStack.EMPTY) // must be NON-null
    }
  }
}

function isFireDamage(source) {
  try {
    if (source && typeof source.is === "function" && source.is(DamageTypeTags.IS_FIRE)) return true
  } catch (e) {}

  try {
    if (source && typeof source.type === "function") {
      var holder = source.type()
      if (holder && typeof holder.is === "function" && holder.is(DamageTypeTags.IS_FIRE)) return true
    }
  } catch (e) {}

  return false
}

function explodeLikeTnt(level, player, power) {
  var lastErr = null

  try {
    level.explode(player, player.x, player.y, player.z, power, false, ExplosionInteraction.TNT)
    return true
  } catch (e) { lastErr = e }

  try {
    level.explode(player, player.x, player.y, player.z, power, ExplosionInteraction.TNT)
    return true
  } catch (e) { lastErr = e }

  console.log("[volatile] Could not create explosion: " + lastErr)
  return false
}

function computeExplosion(inv) {
  var strength = 0.0
  var hasAny = false

  for (var itemId in volatilecompounds) {
    if (!volatilecompounds.hasOwnProperty(itemId)) continue

    var perItem = Number(volatilecompounds[itemId])
    var amt = countItem(inv, itemId)

    if (amt > 0) {
      hasAny = true
      strength += amt * perItem
    }
  }

  if (strength > max_explosion_strength) strength = max_explosion_strength

  return { strength: strength, hasAny: hasAny }
}

function destroyAllVolatiles(inv) {
  for (var itemId in volatilecompounds) {
    if (!volatilecompounds.hasOwnProperty(itemId)) continue
    removeAll(inv, itemId)
  }
}

EntityEvents.hurt(function (event) {
  var player = event.entity
  if (!player || !(typeof player.isPlayer === "function" && player.isPlayer())) return

  var inv = player.inventory
  if (!inv) return

  if (!isFireDamage(event.source)) return

  var result = computeExplosion(inv)
  if (!result.hasAny) return
  if (result.strength <= 0) return

  if (DEBUG) console.log("[volatile] exploding with strength=" + result.strength)

  // consume items first to prevent chain triggers
  destroyAllVolatiles(inv)

  var level = event.level || player.level
  explodeLikeTnt(level, player, result.strength)
})

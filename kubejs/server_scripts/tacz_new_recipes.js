// TacZ recipes — all crafted at the Gun Smith Table via tacz:gun_smith_table_crafting
// Native recipe format:
//   materials: [ { item: { item: "mod:id" } or { tag: "c:tag" }, count: N }, ... ]
//   result: { type: "gun", id: "tacz:gun_id" } | { type: "ammo", group: "...", id: "tacz:ammo_id", count: N } | { type: "attachment", id: "tacz:attachment_id" }

const CBC = Platform.isLoaded('createbigcannons')
const DESTROY = Platform.isLoaded('destroy')
const POWERGRID = Platform.isLoaded('powergrid')

function item(id, count) {
  return { item: { item: id }, count: count || 1 }
}

function tag(id, count) {
  return { item: { tag: id }, count: count || 1 }
}

if (Platform.isLoaded('tacz')) {
ServerEvents.recipes(event => {

// ===================== SMOKELESS POWDER  =====================
if (Platform.isLoaded('destroy')) {
  event.custom({
    type: 'create:mixing',
    heat_requirement: 'heated',
    ingredients: [
      { item: 'minecraft:gunpowder', count: 3 },
      { item: 'createmetallurgy:graphite' },
      { item: 'destroy:nitrocellulose' },
      {
        type: 'destroy:mixture_with_molecule',
        amount: 250,
        molecule: 'destroy:ethanol',
        min_concentration: 4.5,
        max_concentration: 5.5
      }
    ],
    results: [
      { id: 'kubejs:smokeless_powder', count: 2 }
    ]
  }).id('kubejs:mixing/smokeless_powder')
}

// ===================== GUNS =====================

// ---- PISTOLS ----

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/iron', 24),
    tag('c:plates/brass', 32),
    item('destroy:lead_ingot', 32),
    item('destroy:polyisoprene', 4),
    tag('c:plates/gold', 128),
    item('minecraft:lapis_lazuli', 4),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('create:precision_mechanism', 1)
  ],
  result: { type: 'gun', id: 'tacz:hk_mk23' }
}).id('kubejs:tacz/gun/hk_mk23')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 24),
    tag('c:plates/brass', 32),
    item('destroy:chromium_ingot', 16),
    item('destroy:polyvinyl_chloride', 4),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 32),
    item('create:precision_mechanism', 2)
  ],
  result: { type: 'gun', id: 'tacz:m9a4' }
}).id('kubejs:tacz/gun/m9a4')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 12),
    tag('c:plates/brass', 16),
    item('minecraft:dark_oak_log', 64),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    tag('c:plates/iron', 32),
    item('create:precision_mechanism', 1)
  ],
  result: { type: 'gun', id: 'tacz:taurus943' }
}).id('kubejs:tacz/gun/taurus943')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 32),
    tag('c:plates/brass', 32),
    item('destroy:chromium_ingot', 16),
    item('destroy:polyvinyl_chloride', 6),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 32),
    item('create:precision_mechanism', 3)
  ],
  result: { type: 'gun', id: 'tacz:glock_17' }
}).id('kubejs:tacz/gun/glock_17')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 32),
    tag('c:plates/brass', 32),
    item('destroy:chromium_ingot', 16),
    item('destroy:polyisoprene', 4),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 32),
    item('create:precision_mechanism', 3)
  ],
  result: { type: 'gun', id: 'tacz:cz75' }
}).id('kubejs:tacz/gun/cz75')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 48),
    tag('c:plates/brass', 48),
    item('destroy:lead_ingot', 32),
    item('destroy:polyisoprene', 4),
    tag('c:plates/gold', 64),
    item('minecraft:lapis_lazuli', 8),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('create:precision_mechanism', 4)
  ],
  result: { type: 'gun', id: 'tacz:rhino357' }
}).id('kubejs:tacz/gun/rhino357')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 48),
    tag('c:plates/brass', 64),
    item('destroy:lead_ingot', 64),
    item('destroy:polyisoprene', 4),
    tag('c:plates/gold', 64),
    item('minecraft:lapis_lazuli', 16),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    item('create:precision_mechanism', 4)
  ],
  result: { type: 'gun', id: 'tacz:lonetrail' }
}).id('kubejs:tacz/gun/lonetrail')

// DB-4 Ursus — double barrel shotgun
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:dark_oak_log', 256),
    item('createmetallurgy:steel_ingot', 48),
    tag('c:plates/brass', 64),
    item('createbigcannons:steel_autocannon_barrel', 2),
    item('createbigcannons:steel_autocannon_breech', 2),
    tag('c:plates/iron', 64),
    item('create:precision_mechanism', 4)
  ],
  result: { type: 'gun', id: 'tacz:db_long' }
}).id('kubejs:tacz/gun/db_long')

// DB-2 Durin — sawn-off
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:oak_log', 192),
    item('createmetallurgy:steel_ingot', 32),
    tag('c:plates/brass', 32),
    item('createbigcannons:steel_autocannon_barrel', 2),
    item('createbigcannons:steel_autocannon_breech', 2),
    tag('c:plates/iron', 48),
    item('create:precision_mechanism', 3)
  ],
  result: { type: 'gun', id: 'tacz:db_short' }
}).id('kubejs:tacz/gun/db_short')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 40),
    tag('c:plates/brass', 32),
    item('destroy:polyisoprene', 6),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 32),
    item('create:precision_mechanism', 3)
  ],
  result: { type: 'gun', id: 'tacz:b93r' }
}).id('kubejs:tacz/gun/b93r')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:dark_oak_log', 128),
    item('createmetallurgy:steel_ingot', 32),
    tag('c:plates/brass', 32),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    tag('c:plates/iron', 48),
    item('create:precision_mechanism', 3)
  ],
  result: { type: 'gun', id: 'tacz:m1911' }
}).id('kubejs:tacz/gun/m1911')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 32),
    tag('c:plates/brass', 48),
    item('destroy:lead_ingot', 32),
    tag('c:plates/gold', 256),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    tag('c:plates/iron', 48),
    item('create:precision_mechanism', 3)
  ],
  result: { type: 'gun', id: 'tacz:deagle_golden' }
}).id('kubejs:tacz/gun/deagle_golden')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 48),
    tag('c:plates/brass', 48),
    item('destroy:chromium_ingot', 16),
    item('destroy:polyvinyl_chloride', 6),
    tag('c:plates/gold', 64),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 32),
    item('create:precision_mechanism', 4)
  ],
  result: { type: 'gun', id: 'tacz:p320' }
}).id('kubejs:tacz/gun/p320')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:lead_ingot', 64),
    item('destroy:nylon', 6),
    tag('c:plates/gold', 96),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 48),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:timeless50' }
}).id('kubejs:tacz/gun/timeless50')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 48),
    tag('c:plates/brass', 48),
    item('destroy:polyisoprene', 4),
    tag('c:plates/iron', 48),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    item('create:precision_mechanism', 4)
  ],
  result: { type: 'gun', id: 'tacz:hk_mp5a5' }
}).id('kubejs:tacz/gun/hk_mp5a5')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:lead_ingot', 32),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 48),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:deagle' }
}).id('kubejs:tacz/gun/deagle')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:polyvinyl_chloride', 8),
    tag('c:plates/gold', 64),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 48),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:ump45' }
}).id('kubejs:tacz/gun/ump45')

// Taurus 500 — huge revolver
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 96),
    tag('c:plates/brass', 96),
    item('destroy:chromium_ingot', 32),
    item('destroy:lead_ingot', 64),
    item('destroy:polyisoprene', 6),
    tag('c:plates/gold', 128),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    tag('c:plates/iron', 48),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 8)
  ],
  result: { type: 'gun', id: 'tacz:taurus500' }
}).id('kubejs:tacz/gun/taurus500')

// ---- SMGs ----

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:spruce_log', 256),
    item('createmetallurgy:steel_ingot', 48),
    tag('c:plates/brass', 48),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('create:precision_mechanism', 4)
  ],
  result: { type: 'gun', id: 'tacz:uzi' }
}).id('kubejs:tacz/gun/uzi')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 80),
    tag('c:plates/brass', 80),
    item('destroy:polyvinyl_chloride', 12),
    item('destroy:chromium_ingot', 16),
    tag('c:plates/gold', 64),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 48),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 6)
  ],
  result: { type: 'gun', id: 'tacz:p90' }
}).id('kubejs:tacz/gun/p90')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 80),
    tag('c:plates/brass', 80),
    item('destroy:nylon', 8),
    item('destroy:chromium_ingot', 32),
    tag('c:plates/gold', 128),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 6)
  ],
  result: { type: 'gun', id: 'tacz:vector45' }
}).id('kubejs:tacz/gun/vector45')

// ---- SHOTGUNS ----

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:dark_oak_log', 384),
    item('createmetallurgy:steel_ingot', 48),
    tag('c:plates/brass', 48),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('create:precision_mechanism', 4)
  ],
  result: { type: 'gun', id: 'tacz:m870' }
}).id('kubejs:tacz/gun/m870')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 96),
    tag('c:plates/brass', 96),
    item('destroy:polyvinyl_chloride', 8),
    item('destroy:chromium_ingot', 16),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 8)
  ],
  result: { type: 'gun', id: 'tacz:aa12' }
}).id('kubejs:tacz/gun/aa12')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 80),
    tag('c:plates/brass', 80),
    item('destroy:polyvinyl_chloride', 6),
    tag('c:plates/gold', 96),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 6)
  ],
  result: { type: 'gun', id: 'tacz:m1014' }
}).id('kubejs:tacz/gun/m1014')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 128),
    tag('c:plates/brass', 128),
    item('destroy:polyvinyl_chloride', 8),
    tag('c:plates/gold', 128),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 4),
    item('create:precision_mechanism', 10)
  ],
  result: { type: 'gun', id: 'tacz:spas_12' }
}).id('kubejs:tacz/gun/spas_12')

// ---- RIFLES ----

// Springfield 1873 — EARLY GAME, uses iron + cast iron
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:oak_log', 1024),
    tag('c:plates/iron', 64),
    tag('c:plates/brass', 64),
    item('createbigcannons:cast_iron_autocannon_barrel', 1),
    item('createbigcannons:cast_iron_sliding_breech', 1),
    tag('c:plates/iron', 64),
    item('create:precision_mechanism', 1)
  ],
  result: { type: 'gun', id: 'tacz:springfield1873' }
}).id('kubejs:tacz/gun/springfield1873')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:spruce_log', 512),
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:chromium_ingot', 16),
    item('destroy:polyvinyl_chloride', 6),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:m16a4' }
}).id('kubejs:tacz/gun/m16a4')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 80),
    tag('c:plates/brass', 80),
    item('destroy:nylon', 8),
    item('destroy:chromium_ingot', 32),
    tag('c:plates/gold', 96),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 6)
  ],
  result: { type: 'gun', id: 'tacz:scar_l' }
}).id('kubejs:tacz/gun/scar_l')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:spruce_log', 512),
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:chromium_ingot', 16),
    item('destroy:polyvinyl_chloride', 6),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:m4a1' }
}).id('kubejs:tacz/gun/m4a1')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:spruce_log', 384),
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:polyvinyl_chloride', 8),
    item('destroy:chromium_ingot', 16),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 48),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:aug' }
}).id('kubejs:tacz/gun/aug')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:spruce_log', 512),
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:type_81' }
}).id('kubejs:tacz/gun/type_81')

// AKM — the classic
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:birch_log', 2048),
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:lead_ingot', 64),
    item('destroy:chromium_ingot', 64),
    item('destroy:polyisoprene', 16),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:ak47' }
}).id('kubejs:tacz/gun/ak47')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:spruce_log', 384),
    item('createmetallurgy:steel_ingot', 80),
    tag('c:plates/brass', 80),
    item('destroy:chromium_ingot', 32),
    item('destroy:polyvinyl_chloride', 8),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 6)
  ],
  result: { type: 'gun', id: 'tacz:qbz_95' }
}).id('kubejs:tacz/gun/qbz_95')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:dark_oak_log', 1024),
    item('createmetallurgy:steel_ingot', 80),
    tag('c:plates/brass', 96),
    item('destroy:lead_ingot', 64),
    tag('c:plates/gold', 128),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 6)
  ],
  result: { type: 'gun', id: 'tacz:fn_fal' }
}).id('kubejs:tacz/gun/fn_fal')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 80),
    tag('c:plates/brass', 80),
    item('destroy:nylon', 8),
    item('destroy:chromium_ingot', 32),
    tag('c:plates/gold', 128),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 6)
  ],
  result: { type: 'gun', id: 'tacz:g36k' }
}).id('kubejs:tacz/gun/g36k')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:birch_log', 512),
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:chromium_ingot', 16),
    item('destroy:polyisoprene', 6),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:sks_tactical' }
}).id('kubejs:tacz/gun/sks_tactical')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 80),
    tag('c:plates/brass', 80),
    item('destroy:nylon', 8),
    item('destroy:chromium_ingot', 32),
    tag('c:plates/gold', 128),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 6)
  ],
  result: { type: 'gun', id: 'tacz:hk416d' }
}).id('kubejs:tacz/gun/hk416d')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:spruce_log', 384),
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:polyvinyl_chloride', 6),
    item('destroy:chromium_ingot', 16),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:m16a1' }
}).id('kubejs:tacz/gun/m16a1')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 96),
    tag('c:plates/brass', 96),
    item('destroy:nylon', 8),
    item('destroy:chromium_ingot', 32),
    tag('c:plates/gold', 96),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 8)
  ],
  result: { type: 'gun', id: 'tacz:qbz_191' }
}).id('kubejs:tacz/gun/qbz_191')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:dark_oak_log', 512),
    item('createmetallurgy:steel_ingot', 80),
    tag('c:plates/brass', 80),
    item('destroy:lead_ingot', 64),
    tag('c:plates/gold', 96),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 6)
  ],
  result: { type: 'gun', id: 'tacz:hk_g3' }
}).id('kubejs:tacz/gun/hk_g3')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 96),
    tag('c:plates/brass', 96),
    item('destroy:nylon', 8),
    item('destroy:chromium_ingot', 32),
    tag('c:plates/gold', 96),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 8)
  ],
  result: { type: 'gun', id: 'tacz:spr15hb' }
}).id('kubejs:tacz/gun/spr15hb')

// SCAR-H — Excellent tier
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 128),
    tag('c:plates/brass', 128),
    item('destroy:nylon', 8),
    item('destroy:chromium_ingot', 32),
    item('destroy:lead_ingot', 64),
    tag('c:plates/gold', 128),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    item('cataclysm:cursium_ingot', 2),
    item('iceandfire:dragonbone', 2),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 4),
    item('create:precision_mechanism', 10)
  ],
  result: { type: 'gun', id: 'tacz:scar_h' }
}).id('kubejs:tacz/gun/scar_h')

// Kar98k — bolt action
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:dark_oak_log', 1024),
    item('createmetallurgy:steel_ingot', 48),
    tag('c:plates/brass', 48),
    item('minecraft:lapis_lazuli', 12),
    tag('c:plates/gold', 64),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_sliding_breech', 1),
    tag('c:plates/iron', 64),
    item('create:precision_mechanism', 4)
  ],
  result: { type: 'gun', id: 'tacz:kar98' }
}).id('kubejs:tacz/gun/kar98')

// ---- LMGs ----

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 128),
    tag('c:plates/brass', 128),
    item('destroy:polyvinyl_chloride', 12),
    item('destroy:chromium_ingot', 32),
    item('destroy:lead_ingot', 64),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    tag('c:plates/iron', 96),
    item('destroy:stainless_steel_ingot', 4),
    item('create:precision_mechanism', 10)
  ],
  result: { type: 'gun', id: 'tacz:m249' }
}).id('kubejs:tacz/gun/m249')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:birch_log', 768),
    item('createmetallurgy:steel_ingot', 96),
    tag('c:plates/brass', 96),
    item('destroy:lead_ingot', 64),
    tag('c:plates/gold', 96),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    tag('c:plates/iron', 96),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 8)
  ],
  result: { type: 'gun', id: 'tacz:rpk' }
}).id('kubejs:tacz/gun/rpk')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 160),
    tag('c:plates/brass', 160),
    item('destroy:nylon', 12),
    item('destroy:chromium_ingot', 48),
    item('destroy:lead_ingot', 96),
    tag('c:plates/gold', 192),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    tag('c:plates/iron', 96),
    item('destroy:stainless_steel_ingot', 4),
    item('create:precision_mechanism', 12)
  ],
  result: { type: 'gun', id: 'tacz:fn_evolys' }
}).id('kubejs:tacz/gun/fn_evolys')

// ---- SNIPERS ----

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:dark_oak_log', 512),
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:lead_ingot', 32),
    tag('c:plates/gold', 64),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_screw_breech', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:m700' }
}).id('kubejs:tacz/gun/m700')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:dark_oak_log', 384),
    item('createmetallurgy:steel_ingot', 96),
    tag('c:plates/brass', 96),
    item('destroy:nylon', 8),
    item('destroy:chromium_ingot', 32),
    item('destroy:lead_ingot', 64),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_screw_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 8)
  ],
  result: { type: 'gun', id: 'tacz:mk14' }
}).id('kubejs:tacz/gun/mk14')

// AI AWM — OP tier
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 160),
    tag('c:plates/brass', 160),
    item('destroy:nylon', 12),
    item('destroy:chromium_ingot', 48),
    item('destroy:lead_ingot', 96),
    item('destroy:stainless_steel_ingot', 4),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_screw_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    item('cataclysm:void_core', 1),
    item('iceandfire:hydra_fang', 1),
    item('mowziesmobs:naga_fang', 1),
    tag('c:plates/iron', 64),
    item('create:precision_mechanism', 12)
  ],
  result: { type: 'gun', id: 'tacz:ai_awp', attachments: { scope: 'tacz:scope_contender' } }
}).id('kubejs:tacz/gun/ai_awp')

// M95 — OP tier
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 256),
    tag('c:plates/brass', 256),
    item('destroy:nylon', 13),
    item('destroy:chromium_ingot', 64),
    item('destroy:lead_ingot', 128),
    item('destroy:stainless_steel_ingot', 6),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_screw_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    item('powergrid:integrated_circuit', 1),
    item('powergrid:resistor', 2),
    item('cataclysm:monstrous_horn', 1),
    item('iceandfire:fire_dragon_blood', 2),
    item('mutantmonsters:hulk_hammer', 1),
    tag('c:plates/iron', 64),
    item('create:precision_mechanism', 20)
  ],
  result: { type: 'gun', id: 'tacz:m95' }
}).id('kubejs:tacz/gun/m95')

// M107 — OP tier
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 320),
    tag('c:plates/brass', 320),
    item('destroy:nylon', 16),
    item('destroy:chromium_ingot', 64),
    item('destroy:lead_ingot', 128),
    item('destroy:stainless_steel_ingot', 6),
    item('minecraft:netherite_scrap', 2),
    item('minecraft:leather', 8),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 2),
    item('powergrid:integrated_circuit', 1),
    item('powergrid:servo', 1),
    item('powergrid:resistor', 2),
    item('cataclysm:witherite_block', 1),
    item('iceandfire:ice_dragon_blood', 2),
    item('mowziesmobs:bluff_rod', 1),
    tag('c:plates/iron', 96),
    item('create:precision_mechanism', 24)
  ],
  result: { type: 'gun', id: 'tacz:m107' }
}).id('kubejs:tacz/gun/m107')

// ---- LAUNCHERS ----

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 64),
    tag('c:plates/brass', 64),
    item('destroy:polyvinyl_chloride', 6),
    tag('c:plates/gold', 128),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 1),
    item('create:precision_mechanism', 5)
  ],
  result: { type: 'gun', id: 'tacz:m320' }
}).id('kubejs:tacz/gun/m320')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:birch_log', 768),
    item('createmetallurgy:steel_ingot', 96),
    tag('c:plates/brass', 96),
    item('destroy:lead_ingot', 64),
    item('createbigcannons:steel_autocannon_barrel', 1),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 1),
    tag('c:plates/iron', 64),
    item('destroy:stainless_steel_ingot', 2),
    item('create:precision_mechanism', 8)
  ],
  result: { type: 'gun', id: 'tacz:rpg7' }
}).id('kubejs:tacz/gun/rpg7')

// ---- SPECIAL ----
// M134 Minigun
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('createmetallurgy:steel_ingot', 320),
    tag('c:plates/brass', 320),
    item('destroy:nylon', 16),
    item('destroy:chromium_ingot', 64),
    item('destroy:lead_ingot', 128),
    tag('c:plates/gold', 256),
    item('createbigcannons:steel_autocannon_barrel', 4),
    item('createbigcannons:steel_autocannon_breech', 1),
    item('createbigcannons:steel_autocannon_recoil_spring', 4),
    item('powergrid:electric_motor', 2),
    item('powergrid:integrated_circuit', 1),
    item('cataclysm:infernal_forge', 1),
    item('iceandfire:lightning_dragon_blood', 4),
    item('mowziesmobs:ice_crystal', 1),
    tag('c:plates/iron', 128),
    item('destroy:stainless_steel_ingot', 6),
    item('create:precision_mechanism', 24)
  ],
  result: { type: 'gun', id: 'tacz:minigun' }
}).id('kubejs:tacz/gun/minigun')


// ===================== AMMUNITION =====================

const AMMO_GROUPS = {
  '9mm': 'pd_cartridges',
  '45acp': 'pd_cartridges',
  '57x28': 'pd_cartridges',
  '762x25': 'pd_cartridges',
  '22wmr': 'pd_cartridges',
  '46x30': 'pd_cartridges',
  '556x45': 'ifp_rifle_cartridges',
  '762x39': 'ifp_rifle_cartridges',
  '545x39': 'ifp_rifle_cartridges',
  '58x42': 'ifp_rifle_cartridges',
  '68x51fury': 'ifp_rifle_cartridges',
  '308': 'ifp_rifle_cartridges',
  '30_06': 'lc_specialized',
  '338': 'lc_specialized',
  '357mag': 'lc_specialized',
  '45_70': 'lc_specialized',
  '500mag': 'lc_specialized',
  '50ae': 'lc_specialized',
  '50bmg': 'lc_specialized',
  '792x57': 'ifp_rifle_cartridges',
  '12g': 'shotgun_shells',
  '40mm': 'explosives',
  'rpg_rocket': 'explosives'
}

function ammoRecipe(ammoId, count, powder, brass, copper, lead, extra) {
  const materials = []
  if (powder > 0) materials.push(item('kubejs:smokeless_powder', powder))
  if (brass > 0) materials.push(item('create:brass_ingot', brass))
  if (copper > 0) materials.push(item('minecraft:copper_ingot', copper))
  if (lead > 0) materials.push(item('destroy:lead_ingot', lead))
  materials.push(item('destroy:fulminated_mercury', 1))
  if (extra) {
    extra.forEach(e => materials.push(e))
  }
  event.custom({
    type: 'tacz:gun_smith_table_crafting',
    materials: materials,
    result: { type: 'ammo', group: AMMO_GROUPS[ammoId], id: 'tacz:' + ammoId, count: count }
  }).id('kubejs:tacz/ammo/' + ammoId)
}

// PD Cartridges
ammoRecipe('9mm', 50, 1, 1, 1, 1)
ammoRecipe('45acp', 30, 1, 1, 1, 1)
ammoRecipe('57x28', 48, 1, 1, 1, 1)
ammoRecipe('762x25', 45, 1, 1, 1, 1)
ammoRecipe('22wmr', 100, 1, 1, 0, 1)
ammoRecipe('46x30', 48, 1, 1, 1, 1)

// IFP Rifle
ammoRecipe('556x45', 45, 2, 1, 1, 1)
ammoRecipe('762x39', 35, 2, 1, 1, 1)
ammoRecipe('545x39', 45, 2, 1, 1, 1)
ammoRecipe('58x42', 40, 2, 1, 1, 1)
ammoRecipe('68x51fury', 40, 2, 1, 1, 1)
ammoRecipe('308', 60, 2, 2, 1, 1)

// LC Specialized
ammoRecipe('30_06', 24, 2, 2, 1, 2)
ammoRecipe('338', 18, 3, 2, 1, 2, [item('minecraft:lapis_lazuli', 1)])
ammoRecipe('357mag', 48, 2, 1, 1, 1)
ammoRecipe('45_70', 36, 2, 2, 1, 2)
ammoRecipe('500mag', 32, 3, 2, 1, 2, [item('destroy:chromium_nugget', 1)])
ammoRecipe('50ae', 36, 2, 2, 1, 2)
ammoRecipe('50bmg', 24, 4, 3, 2, 4, [item('destroy:chromium_nugget', 2), item('minecraft:blaze_rod', 1)])
ammoRecipe('792x57', 24, 2, 2, 1, 2)

// Shotgun shells
ammoRecipe('12g', 18, 1, 1, 1, 2, [item('minecraft:iron_nugget', 4)])

// Explosives
ammoRecipe('40mm', 6, 2, 2, 2, 0, [item('minecraft:iron_ingot', 3)])
ammoRecipe('rpg_rocket', 3, 4, 2, 4, 4, [item('minecraft:iron_ingot', 3)])


// ===================== ATTACHMENTS =====================

// ---- SCOPES & SIGHTS ----

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 6),
    item('create:brass_ingot', 2),
    item('minecraft:glass', 2)
  ],
  result: { type: 'attachment', id: 'tacz:scope_1873_6x' }
}).id('kubejs:tacz/att/scope_1873_6x')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 4),
    item('minecraft:glass', 1),
    item('minecraft:amethyst_shard', 1)
  ],
  result: { type: 'attachment', id: 'tacz:scope_98k' }
}).id('kubejs:tacz/att/scope_98k')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 6),
    item('create:brass_ingot', 2),
    item('minecraft:glass', 2),
    item('powergrid:circuit_board', 1),
    item('powergrid:resistor', 1)
  ],
  result: { type: 'attachment', id: 'tacz:scope_elcan_4x' }
}).id('kubejs:tacz/att/scope_elcan_4x')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 6),
    item('destroy:polyvinyl_chloride', 2),
    item('minecraft:glass', 2),
    item('powergrid:circuit_board', 1),
    item('powergrid:resistor', 1)
  ],
  result: { type: 'attachment', id: 'tacz:scope_hamr' }
}).id('kubejs:tacz/att/scope_hamr')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 6),
    item('create:brass_ingot', 2),
    item('destroy:polyvinyl_chloride', 2),
    item('minecraft:glass', 2),
    item('powergrid:circuit_board', 1),
    item('powergrid:resistor', 1)
  ],
  result: { type: 'attachment', id: 'tacz:scope_lpvo_1_6' }
}).id('kubejs:tacz/att/scope_lpvo_1_6')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 8),
    item('create:brass_ingot', 2),
    item('destroy:polyvinyl_chloride', 4),
    item('minecraft:glass', 4),
    item('powergrid:circuit_board', 1),
    item('powergrid:resistor', 2)
  ],
  result: { type: 'attachment', id: 'tacz:scope_mk5hd' }
}).id('kubejs:tacz/att/scope_mk5hd')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 4),
    item('minecraft:glass', 2),
    item('powergrid:circuit_board', 1),
    item('powergrid:resistor', 1)
  ],
  result: { type: 'attachment', id: 'tacz:scope_qmk152' }
}).id('kubejs:tacz/att/scope_qmk152')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 4),
    item('minecraft:glass', 1),
    item('minecraft:amethyst_shard', 1)
  ],
  result: { type: 'attachment', id: 'tacz:scope_retro_2x' }
}).id('kubejs:tacz/att/scope_retro_2x')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 8),
    item('create:brass_ingot', 4),
    item('destroy:polyvinyl_chloride', 4),
    item('minecraft:glass', 4),
    item('powergrid:circuit_board', 1),
    item('powergrid:resistor', 2)
  ],
  result: { type: 'attachment', id: 'tacz:scope_standard_8x' }
}).id('kubejs:tacz/att/scope_standard_8x')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 6),
    item('create:brass_ingot', 2),
    item('destroy:polyvinyl_chloride', 2),
    item('minecraft:glass', 2),
    item('powergrid:circuit_board', 1),
    item('powergrid:resistor', 1)
  ],
  result: { type: 'attachment', id: 'tacz:scope_vudu' }
}).id('kubejs:tacz/att/scope_vudu')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 4),
    item('minecraft:glass', 1),
    item('minecraft:amethyst_shard', 2),
    item('powergrid:circuit_board', 1),
    item('powergrid:resistor', 1)
  ],
  result: { type: 'attachment', id: 'tacz:scope_acog_ta31' }
}).id('kubejs:tacz/att/scope_acog_ta31')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 4),
    item('minecraft:glass', 1),
    item('minecraft:amethyst_shard', 1)
  ],
  result: { type: 'attachment', id: 'tacz:scope_contender' }
}).id('kubejs:tacz/att/scope_contender')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 3),
    item('minecraft:glass', 1),
    item('minecraft:amethyst_shard', 1)
  ],
  result: { type: 'attachment', id: 'tacz:scope_aug_default' }
}).id('kubejs:tacz/att/scope_aug_default')

// ---- RED DOT SIGHTS ----

function redDot(id, steel, glass, hasBoard) {
  const materials = [tag('c:plates/steel', steel), item('minecraft:glass_pane', glass)]
  if (hasBoard) materials.push(item('powergrid:circuit_board', 1))
  event.custom({
    type: 'tacz:gun_smith_table_crafting',
    materials: materials,
    result: { type: 'attachment', id: id }
  }).id('kubejs:tacz/att/' + id.replace('tacz:', ''))
}

redDot('tacz:sight_552', 4, 2, true)
redDot('tacz:sight_acro_pistol', 2, 1, true)
redDot('tacz:sight_acro_rifle', 3, 1, true)
redDot('tacz:sight_coyote', 3, 2, true)
redDot('tacz:sight_deltapoint_pistol', 2, 1, true)
redDot('tacz:sight_deltapoint_rifle', 3, 1, true)
redDot('tacz:sight_exp3', 4, 2, true)
redDot('tacz:sight_fastfire_pistol', 2, 1, true)
redDot('tacz:sight_fastfire_rifle', 3, 1, true)
redDot('tacz:sight_okp7', 3, 2, true)
redDot('tacz:sight_pk06_pistol', 2, 1, true)
redDot('tacz:sight_pk06_rifle', 3, 1, true)
redDot('tacz:sight_rmr_dot', 2, 1, true)
redDot('tacz:sight_sro_dot', 2, 1, true)
redDot('tacz:sight_srs_02', 3, 2, true)
redDot('tacz:sight_t1', 2, 1, true)
redDot('tacz:sight_t2', 3, 1, true)
redDot('tacz:sight_uh1', 5, 3, true)

// ---- MUZZLES ----

function muzzle(id, steel, addItem, addCount) {
  const materials = [tag('c:plates/steel', steel)]
  if (addItem) materials.push(item(addItem, addCount || 1))
  event.custom({
    type: 'tacz:gun_smith_table_crafting',
    materials: materials,
    result: { type: 'attachment', id: id }
  }).id('kubejs:tacz/att/' + id.replace('tacz:', ''))
}

muzzle('tacz:muzzle_brake_cthulhu', 6)
muzzle('tacz:muzzle_brake_cyclone_d2', 4)
muzzle('tacz:muzzle_brake_mastiff_sg', 8)
muzzle('tacz:muzzle_brake_pioneer', 6)
muzzle('tacz:muzzle_brake_timeless50', 10)
muzzle('tacz:muzzle_brake_trex', 8)
muzzle('tacz:muzzle_choke_sg', 4)
muzzle('tacz:muzzle_compensator_trident', 4)

// Suppressors
function suppressor(id, steel, leather) {
  const materials = [tag('c:plates/steel', steel), item('create:brass_nugget', 4)]
  if (leather) materials.push(item('minecraft:leather', leather))
  event.custom({
    type: 'tacz:gun_smith_table_crafting',
    materials: materials,
    result: { type: 'attachment', id: id }
  }).id('kubejs:tacz/att/' + id.replace('tacz:', ''))
}

suppressor('tacz:muzzle_silencer_knight_qd', 8, 4)
suppressor('tacz:muzzle_silencer_mirage', 6)
suppressor('tacz:muzzle_silencer_phantom_s1', 8, 4)
suppressor('tacz:muzzle_silencer_ptilopsis', 6)
suppressor('tacz:muzzle_silencer_sg', 8, 4)
suppressor('tacz:muzzle_silencer_ursus', 8, 4)
suppressor('tacz:muzzle_silencer_vulture', 8, 4)
suppressor('tacz:muzzle_silencer_wraith', 6)

// ---- GRIPS ----

function grip(id, steel, leather) {
  event.custom({
    type: 'tacz:gun_smith_table_crafting',
    materials: [
      tag('c:plates/steel', steel),
      item('minecraft:leather', leather)
    ],
    result: { type: 'attachment', id: id }
  }).id('kubejs:tacz/att/' + id.replace('tacz:', ''))
}

grip('tacz:grip_cobra', 3, 2)
grip('tacz:grip_magpul_afg_2', 3, 2)
grip('tacz:grip_osovets_black', 3, 2)
grip('tacz:grip_rk0', 3, 2)
grip('tacz:grip_rk1_b25u', 4, 3)
grip('tacz:grip_rk6', 2, 1)
grip('tacz:grip_se_5', 3, 2)
grip('tacz:grip_td', 3, 2)
grip('tacz:grip_vertical_military', 4, 3)
grip('tacz:grip_vertical_ranger', 5, 3)
grip('tacz:grip_vertical_talon', 3, 2)

// ---- STOCKS ----

function stock(id, steel, leather, wood) {
  const materials = [tag('c:plates/steel', steel), item('minecraft:leather', leather)]
  if (wood) materials.push(item('minecraft:oak_log', wood))
  event.custom({
    type: 'tacz:gun_smith_table_crafting',
    materials: materials,
    result: { type: 'attachment', id: id }
  }).id('kubejs:tacz/att/' + id.replace('tacz:', ''))
}

stock('tacz:stock_ak12', 5, 3, 8)
stock('tacz:stock_carbon_bone_c5', 4, 2)
stock('tacz:stock_heavy_spas_12', 6, 4)
stock('tacz:stock_hk_slim_line', 5, 3)
stock('tacz:stock_m4ss', 3, 2)
stock('tacz:stock_militech_b5', 5, 3)
stock('tacz:stock_moe', 4, 3)
stock('tacz:stock_ripstock', 4, 3)
stock('tacz:stock_sba3', 4, 3)
stock('tacz:stock_tactical_ar', 6, 4)
stock('tacz:stock_tactical_spas_12', 5, 3)
stock('tacz:oem_stock_heavy', 4, 3)
stock('tacz:oem_stock_light', 3, 2)
stock('tacz:oem_stock_tactical', 5, 3)

// ---- EXTENDED MAGS ----

function extMag(id, steel, extra) {
  const materials = [tag('c:plates/steel', steel)]
  if (extra) materials.push(item(extra.item, extra.count))
  event.custom({
    type: 'tacz:gun_smith_table_crafting',
    materials: materials,
    result: { type: 'attachment', id: id }
  }).id('kubejs:tacz/att/' + id.replace('tacz:', ''))
}

extMag('tacz:extended_mag_1', 6, { item: 'create:brass_nugget', count: 4 })
extMag('tacz:extended_mag_2', 8, { item: 'create:brass_ingot', count: 2 })
extMag('tacz:extended_mag_3', 12, { item: 'minecraft:gold_ingot', count: 4 })
extMag('tacz:light_extended_mag_1', 4)
extMag('tacz:light_extended_mag_2', 6)
extMag('tacz:light_extended_mag_3', 8)
extMag('tacz:shotgun_extended_mag_1', 4)
extMag('tacz:shotgun_extended_mag_2', 6, { item: 'create:brass_nugget', count: 4 })
extMag('tacz:shotgun_extended_mag_3', 8, { item: 'create:brass_ingot', count: 2 })
extMag('tacz:sniper_extended_mag_1', 8, { item: 'create:brass_ingot', count: 2 })
extMag('tacz:sniper_extended_mag_2', 12, { item: 'create:brass_ingot', count: 4 })
extMag('tacz:sniper_extended_mag_3', 16, { item: 'create:brass_ingot', count: 6 })

// ---- LASERS ----

function laser(id, steel, extra) {
  const materials = [
    tag('c:plates/steel', steel),
    item('powergrid:circuit_board', 1),
    item('powergrid:resistor', 1)
  ]
  if (extra) materials.push(extra)
  event.custom({
    type: 'tacz:gun_smith_table_crafting',
    materials: materials,
    result: { type: 'attachment', id: id }
  }).id('kubejs:tacz/att/' + id.replace('tacz:', ''))
}

laser('tacz:laser_compact', 2)
laser('tacz:laser_lopro', 3)
laser('tacz:laser_nightstick', 2)
laser('tacz:laser_peq6', 4, item('minecraft:amethyst_shard', 1))

// ---- BAYONETS ----

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 3),
    item('minecraft:oak_log', 32)
  ],
  result: { type: 'attachment', id: 'tacz:bayonet_6h3' }
}).id('kubejs:tacz/att/bayonet_6h3')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 4),
    item('minecraft:oak_log', 32)
  ],
  result: { type: 'attachment', id: 'tacz:bayonet_m9' }
}).id('kubejs:tacz/att/bayonet_m9')

// ---- SPECIAL ----
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    tag('c:plates/steel', 8),
    item('minecraft:gold_ingot', 16)
  ],
  result: { type: 'attachment', id: 'tacz:deagle_golden_long_barrel' }
}).id('kubejs:tacz/att/deagle_golden_long_barrel')

// ---- AMMO MODS ----
event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:crying_obsidian', 2),
    item('minecraft:diamond', 5),
    tag('c:plates/steel', 4)
  ],
  result: { type: 'attachment', id: 'tacz:ammo_mod_fmj' }
}).id('kubejs:tacz/att/ammo_mod_fmj')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:crying_obsidian', 3),
    item('minecraft:end_crystal', 1),
    tag('c:plates/steel', 4)
  ],
  result: { type: 'attachment', id: 'tacz:ammo_mod_he' }
}).id('kubejs:tacz/att/ammo_mod_he')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:crying_obsidian', 3),
    item('minecraft:gold_ingot', 8),
    tag('c:plates/steel', 4)
  ],
  result: { type: 'attachment', id: 'tacz:ammo_mod_hp' }
}).id('kubejs:tacz/att/ammo_mod_hp')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:crying_obsidian', 2),
    item('minecraft:fire_charge', 1),
    item('minecraft:blaze_rod', 4),
    tag('c:plates/steel', 4)
  ],
  result: { type: 'attachment', id: 'tacz:ammo_mod_i' }
}).id('kubejs:tacz/att/ammo_mod_i')

event.custom({
  type: 'tacz:gun_smith_table_crafting',
  materials: [
    item('minecraft:crying_obsidian', 3),
    item('minecraft:netherite_scrap', 1),
    tag('c:plates/steel', 4)
  ],
  result: { type: 'attachment', id: 'tacz:ammo_mod_slug' }
}).id('kubejs:tacz/att/ammo_mod_slug')

})
}

// Give a specific player items when they log in
PlayerEvents.loggedIn(event => {
    const player = event.player

    const name = player.username.toLowerCase()
    if (!name.includes('afox')) return


    const pData = player.persistentData
    if (pData.getBoolean('foxified')) return
    pData.putBoolean('foxified', true)

    const keyName = JSON.stringify([
        {"text":"T","bold":true,"color":"#ff0000"},
        {"text":"H","bold":true,"color":"#ff7f00"},
        {"text":"E","bold":true,"color":"#ffff00"},
        {"text":" ","bold":true},
        {"text":"K","bold":true,"color":"#00ff00"},
        {"text":"E","bold":true,"color":"#00ffff"},
        {"text":"Y","bold":true,"color":"#0000ff"},
        {"text":" ","bold":true},
        {"text":"O","bold":true,"color":"#4b0082"},
        {"text":"F","bold":true,"color":"#8b00ff"},
        {"text":" ","bold":true},
        {"text":"D","bold":true,"color":"#ff0000"},
        {"text":"E","bold":true,"color":"#ff7f00"},
        {"text":"S","bold":true,"color":"#ffff00"},
        {"text":"T","bold":true,"color":"#00ff00"},
        {"text":"I","bold":true,"color":"#00ffff"},
        {"text":"N","bold":true,"color":"#0000ff"},
        {"text":"Y","bold":true,"color":"#8b00ff"}
    ])
    const keyPaper = Item.of('minecraft:paper', `{display:{Name:'${keyName}'}}`)

    player.give('casinocraft:cardtable_wide_white')
    player.give('casinocraft:rulebook_2_2')
    player.give('touhou_little')
    player.give('touhou_little_maid:smart_slab_init')
    player.give(Item.of('patchouli:guide_book', '{"patchouli:book":"touhou_little_maid:memorizable_gensokyo"}'))
    player.give(keyPaper)
    player.stages.add("foxy")
})

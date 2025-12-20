ServerEvents.recipes(event => {
    // Bandaid
    event.remove({ id: 'firstaid:bandage' });
    event.shaped('firstaid:bandage', [
        'S S',
        'PPP',
        'S S'
    ], {
        S: 'minecraft:string',
        P: 'minecraft:paper'
    });
    // Bandage
    event.remove({ id: 'firstaid:plaster' });
    event.shaped('firstaid:plaster', [
        '   ',
        'PP ',
        '   '
    ], {
        S: 'minecraft:string',
        P: 'minecraft:paper'
    });
});

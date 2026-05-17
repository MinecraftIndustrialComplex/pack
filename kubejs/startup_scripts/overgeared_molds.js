StartupEvents.registry('item', e => {
    const molds = ['axe', 'pickaxe', 'shovel', 'hoe', 'sword', 'hammer'];
    molds.forEach(mold => {
        e.create(`graphite_${mold}_mold`)
            .displayName(`Graphite ${mold.charAt(0).toUpperCase() + mold.slice(1)} Mold`)
            .unstackable();
    });
});

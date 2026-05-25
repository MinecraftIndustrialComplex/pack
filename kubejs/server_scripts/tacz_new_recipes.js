if (Platform.isLoaded('tacz') && Platform.isLoaded('destroy')) {
ServerEvents.recipes(event => {

    event.recipes.create.mixing(
        '2x kubejs:smokeless_powder', 
        [ 
            '3x minecraft:gunpowder', 
            'createmetallurgy:graphite',
            'destroy:nitrocellulose',
            Fluid.of('createdieselgenerators:ethanol', 250)
        ]
    ).heated()
    .id('kubejs:mixing/smokeless_powder');

    // event.recipes.create.mechanical_crafting(
    //     'tacz:gun_smith_table',
    //     [
    //         'PPPPP',
    //         'SCA S',
    //         'LL LL',
    //         'LL LL'
    //     ],
    //     {
    //         P: '#c:plates/steel',
    //         S: '#c:storage_blocks/steel',
    //     C: 'create:precision_mechanism',
    //     A: 'minecraft:anvil',
    //     L: 'create:treated_wood_planks'
    //     }
    // ).id('kubejs:mechanical_crafting/gun_smith_table');


    // WORKBENCHES (sequenced assembly, currently disabled)

    // event.recipes.create.sequenced_assembly(
    //     [Item.of('tacz:workbench_c', '{BlockId:"tacz:attachment_workbench"}')], 
    //     '#c:storage_blocks/steel',
    //     [
    //         event.recipes.create.deploying('#c:storage_blocks/steel', ['#c:storage_blocks/steel', 'create:precision_mechanism']),
    //         event.recipes.create.deploying('#c:storage_blocks/steel', ['#c:storage_blocks/steel', 'create:deployer']),
    //         event.recipes.create.deploying('#c:storage_blocks/steel', ['#c:storage_blocks/steel', 'create:mechanical_piston']),
    //         event.recipes.create.pressing('#c:storage_blocks/steel', '#c:storage_blocks/steel')
    //     ]
    // ).transitionalItem('#c:plates/steel')
    // .loops(1)
    // .id('kubejs:sequenced_assembly/attachment_workbench');

    // event.recipes.create.sequenced_assembly(
    //     [Item.of('tacz:workbench_a', '{BlockId:"tacz:ammo_workbench"}')], 
    //     '#c:storage_blocks/steel',
    //     [
    //         event.recipes.create.deploying('#c:storage_blocks/steel', ['#c:storage_blocks/steel', 'create:precision_mechanism']),
    //         event.recipes.create.deploying('#c:storage_blocks/steel', ['#c:storage_blocks/steel', 'create:mechanical_pump']),
    //         event.recipes.create.deploying('#c:storage_blocks/steel', ['#c:storage_blocks/steel', 'create:fluid_pipe']),
    //         event.recipes.create.pressing('#c:storage_blocks/steel', '#c:storage_blocks/steel')
    //     ]
    // ).transitionalItem('#c:plates/steel')
    // .loops(1)
    // .id('kubejs:sequenced_assembly/ammo_workbench');
});
}

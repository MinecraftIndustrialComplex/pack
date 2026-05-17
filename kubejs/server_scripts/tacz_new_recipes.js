if (Platform.isLoaded('tacz') && Platform.isLoaded('destroy')) {
ServerEvents.recipes(event => {

    event.recipes.create.mixing(
        '2x kubejs:smokeless_powder', 
        [ 
            '3x minecraft:gunpowder', 
            'destroy:graphite', // Carbon source (Graphite substitute)
            'destroy:nitrocellulose', // The high-tech explosive base
            Fluid.of('destroy:ethanol_distillate', 250) // The solvent
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
    //         C: 'create:precision_mechanism', // Represents the precision tools (screwdrivers, etc.)
    //         A: 'minecraft:anvil',
    //         L: 'create:treated_wood_planks' // Or standard logs if treated wood is unavailable
    //     }
    // ).id('kubejs:mechanical_crafting/gun_smith_table');


    // ==========================================
    // 3. WORKBENCHES (Sequenced Assembly)
    // ==========================================

    /* Attachment Workbench (Workbench C)
       Original: Robot Arms, Electric Pistons, Conveyors.
       New: Sequenced Assembly using Deployers and Pistons.
       
       Simulates installing robotic arms and clamps onto a steel bench.
    */
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

    /* Ammo Workbench (Workbench A)
       Original: Fluid Regulators, Electric Pumps.
       New: Sequenced Assembly using Pumps and Pipes.
       
       Simulates installing hydraulic presses and chemical feeders for ammo casing.
    */
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

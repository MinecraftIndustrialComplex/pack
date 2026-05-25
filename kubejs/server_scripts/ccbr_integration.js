ServerEvents.recipes(event => {
  event.remove({ output: 'ccbr:basic_integrated_circuit' })
  if (Platform.isLoaded('destroy')) {
    event.shaped('ccbr:basic_integrated_circuit', [' a ', 'bPb', 'ccc'], {
      a: '#c:plates/gold',
      b: '#c:dusts/redstone',
      P: '#destroy:plastics/rigid',
      c: '#c:nuggets/iron'
    }).id('kubejs:ccbr/basic_integrated_circuit')
  } else {
    event.shaped('ccbr:basic_integrated_circuit', [' a ', 'bbb', 'ccc'], {
      a: '#c:plates/gold',
      b: '#c:dusts/redstone',
      c: '#c:nuggets/iron'
    }).id('kubejs:ccbr/basic_integrated_circuit')
  }

  event.remove({ output: 'ccbr:integrated_circuit' })
  if (Platform.isLoaded('destroy') && Platform.isLoaded('powergrid')) {
    event.recipes.create.mechanical_crafting('ccbr:integrated_circuit', [
      '  L  ',
      'RQRRR',
      ' BCD ',
      '  E  '
    ], {
      L: '#c:plates/lapis',
      R: '#c:dusts/redstone',
      Q: 'create:polished_rose_quartz',
      B: 'destroy:circuit_board',
      C: '#c:nuggets/gold',
      D: 'powergrid:diode',
      E: 'powergrid:resistor'
    }).id('kubejs:ccbr/integrated_circuit')
  } else if (Platform.isLoaded('destroy')) {
    event.recipes.create.mechanical_crafting('ccbr:integrated_circuit', [
      '  L  ',
      'RRQRR',
      ' BCB '
    ], {
      L: '#c:plates/lapis',
      R: '#c:dusts/redstone',
      Q: 'create:polished_rose_quartz',
      B: 'destroy:circuit_board',
      C: '#c:nuggets/gold'
    }).id('kubejs:ccbr/integrated_circuit')
  } else if (Platform.isLoaded('powergrid')) {
    event.recipes.create.mechanical_crafting('ccbr:integrated_circuit', [
      '  L  ',
      'RRQRR',
      ' CCD '
    ], {
      L: '#c:plates/lapis',
      R: '#c:dusts/redstone',
      Q: 'create:polished_rose_quartz',
      C: '#c:nuggets/gold',
      D: 'powergrid:diode'
    }).id('kubejs:ccbr/integrated_circuit')
  } else {
    event.recipes.create.mechanical_crafting('ccbr:integrated_circuit', [
      '  L  ',
      'RRQRR',
      ' CCC '
    ], {
      L: '#c:plates/lapis',
      R: '#c:dusts/redstone',
      Q: 'create:polished_rose_quartz',
      C: '#c:nuggets/gold'
    }).id('kubejs:ccbr/integrated_circuit')
  }

  if (Platform.isLoaded('destroy')) {
    event.remove({ output: 'computercraft:cable' })
    event.shaped('8x computercraft:cable', [' # ', '#R#', ' # '], {
      '#': 'destroy:polyvinyl_chloride',
      'R': '#c:dusts/redstone'
    }).id('kubejs:ccbr/cable')
  }

  if (Platform.isLoaded('powergrid')) {
    event.remove({ id: 'computercraft:disk_drive' })
    event.shaped('computercraft:disk_drive', ['###', 'MCM', '#R#'], {
      '#': 'create:andesite_alloy',
      'M': 'powergrid:electric_motor',
      'C': '#ccbr:basic_integrated_circuits',
      'R': '#c:dusts/redstone'
    }).id('kubejs:ccbr/disk_drive')

    event.remove({ id: 'computercraft:speaker' })
    event.shaped('computercraft:speaker', ['###', 'NMN', '#R#'], {
      '#': 'create:andesite_alloy',
      'N': 'minecraft:note_block',
      'M': 'powergrid:electromagnet',
      'R': '#ccbr:basic_integrated_circuits'
    }).id('kubejs:ccbr/speaker')

    event.remove({ id: 'computercraft:printer' })
    event.shaped('computercraft:printer', ['###', 'MRM', '#D#'], {
      '#': 'create:andesite_alloy',
      'M': 'powergrid:electric_motor',
      'R': '#ccbr:basic_integrated_circuits',
      'D': '#c:dyes'
    }).id('kubejs:ccbr/printer')

    event.remove({ id: 'computercraft:pocket_computer_normal' })
    event.shaped('computercraft:pocket_computer_normal', ['#A#', '#R#', 'B#G'], {
      '#': 'create:andesite_alloy',
      'A': 'minecraft:golden_apple',
      'R': '#ccbr:basic_integrated_circuits',
      'B': 'powergrid:battery',
      'G': '#c:glass_panes'
    }).id('kubejs:ccbr/pocket_computer_normal')

    event.remove({ id: 'computercraft:wired_modem' })
    event.shaped('computercraft:wired_modem', ['WWW', '#R#', '###'], {
      '#': 'create:andesite_alloy',
      'W': 'powergrid:insulated_copper_wire',
      'R': '#ccbr:basic_integrated_circuits'
    }).id('kubejs:ccbr/wired_modem')

    event.remove({ id: 'computercraft:wireless_modem_normal' })
    event.shaped('computercraft:wireless_modem_normal', ['#T#', 'RCR', '#E#'], {
      '#': 'create:andesite_alloy',
      'T': 'create:transmitter',
      'R': 'powergrid:resistor',
      'C': '#ccbr:basic_integrated_circuits',
      'E': '#c:ender_pearls'
    }).id('kubejs:ccbr/wireless_modem_normal')

    // Normal turtle kept unchanged (entry-level)
    event.remove({ id: 'computercraft:turtle_advanced_upgrade' })
    event.custom({
      type: 'computercraft:transform_shaped',
      category: 'redstone',
      pattern: ['#B#', 'SCS', ' R '],
      key: {
        '#': { item: 'create:brass_ingot' },
        'B': { item: 'create:brass_block' },
        'S': { item: 'powergrid:servo' },
        'C': { item: 'computercraft:turtle_normal' },
        'R': { tag: 'ccbr:advanced_integrated_circuits' }
      },
      result: { id: 'computercraft:turtle_advanced', count: 1 },
      function: [{
        type: 'computercraft:copy_components',
        from: { item: 'computercraft:turtle_normal' }
      }]
    }).id('kubejs:ccbr/turtle_advanced_upgrade')
  }

  if (Platform.isLoaded('destroy') && Platform.isLoaded('powergrid')) {
    event.remove({ id: 'computercraft:computer_advanced' })
    event.shaped('computercraft:computer_advanced', ['###', 'BRB', '#G#'], {
      '#': 'destroy:stainless_steel_ingot',
      'B': 'powergrid:circuit_board',
      'R': '#ccbr:advanced_integrated_circuits',
      'G': '#c:glass_panes'
    }).id('kubejs:ccbr/computer_advanced')

    event.remove({ id: 'computercraft:computer_advanced_upgrade' })
    event.custom({
      type: 'computercraft:transform_shaped',
      category: 'redstone',
      pattern: ['###', 'BCB', '#R#'],
      key: {
        '#': { item: 'destroy:stainless_steel_ingot' },
        'B': { item: 'powergrid:circuit_board' },
        'C': { item: 'computercraft:computer_normal' },
        'R': { tag: 'ccbr:advanced_integrated_circuits' }
      },
      result: { id: 'computercraft:computer_advanced', count: 1 },
      function: [{
        type: 'computercraft:copy_components',
        from: { item: 'computercraft:computer_normal' }
      }]
    }).id('kubejs:ccbr/computer_advanced_upgrade')

    event.remove({ id: 'computercraft:monitor_advanced' })
    event.shaped('4x computercraft:monitor_advanced', ['###', '#G#', '#E#'], {
      '#': 'destroy:stainless_steel_ingot',
      'G': '#c:glass_panes',
      'E': 'powergrid:crt'
    }).id('kubejs:ccbr/monitor_advanced')

    event.remove({ id: 'computercraft:pocket_computer_advanced' })
    event.shaped('computercraft:pocket_computer_advanced', ['#A#', '#R#', 'B#G'], {
      '#': 'destroy:stainless_steel_ingot',
      'A': 'minecraft:golden_apple',
      'R': '#ccbr:advanced_integrated_circuits',
      'B': 'powergrid:portable_battery',
      'G': '#c:glass_panes'
    }).id('kubejs:ccbr/pocket_computer_advanced')

    event.remove({ id: 'computercraft:pocket_computer_advanced_upgrade' })
    event.custom({
      type: 'computercraft:transform_shaped',
      category: 'redstone',
      pattern: ['###', 'BCB', '#R#'],
      key: {
        '#': { item: 'destroy:stainless_steel_ingot' },
        'B': { item: 'powergrid:portable_battery' },
        'C': { item: 'computercraft:pocket_computer_normal' },
        'R': { tag: 'ccbr:advanced_integrated_circuits' }
      },
      result: { id: 'computercraft:pocket_computer_advanced', count: 1 },
      function: [{
        type: 'computercraft:copy_components',
        from: { item: 'computercraft:pocket_computer_normal' }
      }]
    }).id('kubejs:ccbr/pocket_computer_advanced_upgrade')

    event.remove({ id: 'computercraft:turtle_advanced' })
    event.custom({
      type: 'computercraft:transform_shaped',
      category: 'redstone',
      pattern: ['###', 'SCS', '#I#'],
      key: {
        '#': { item: 'destroy:stainless_steel_ingot' },
        'S': { item: 'powergrid:servo' },
        'C': { item: 'computercraft:computer_advanced' },
        'I': { tag: 'c:chests/wooden' }
      },
      result: { id: 'computercraft:turtle_advanced', count: 1 },
      function: [{
        type: 'computercraft:copy_components',
        from: { item: 'computercraft:computer_advanced' }
      }]
    }).id('kubejs:ccbr/turtle_advanced')

    event.remove({ id: 'computercraft:wireless_modem_advanced' })
    event.shaped('computercraft:wireless_modem_advanced', ['#T#', 'RCR', '#E#'], {
      '#': 'destroy:stainless_steel_ingot',
      'T': 'create:transmitter',
      'R': 'powergrid:diode',
      'C': '#ccbr:advanced_integrated_circuits',
      'E': 'minecraft:ender_eye'
    }).id('kubejs:ccbr/wireless_modem_advanced')
  }
})

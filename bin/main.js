#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');
var convertBTC = require('./convertBTC');

program.version(pkg.version).description('Convert Bitcoin to any currency defined.').option('-C, --currency <currency>', 'Currency to be converted.(default: USD)').option('-A, --amount <amount>', 'Value in bitcoin to convert.(default: 1)').parse(process.argv);

convertBTC(program.currency, program.amount);
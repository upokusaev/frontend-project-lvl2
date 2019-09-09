#!/usr/bin/env node

import genDiff from '..';
var program = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format')
  .arguments('<p1> <p2>')
  .action(function (p1, p2) {
    console.log(genDiff(p1, p2));
  });

program.parse(process.argv);

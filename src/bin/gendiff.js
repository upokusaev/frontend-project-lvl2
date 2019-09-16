#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';


program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format', 'custom')
  .arguments('<p1> <p2>')
  .action((p1, p2) => {
    console.log(genDiff(p1, p2, program.format));
  });

program.parse(process.argv);

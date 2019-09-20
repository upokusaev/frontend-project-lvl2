#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';


program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format', 'custom')
  .arguments('<pathToFile1> <pathToFile2>')
  .action((pathToFile1, pathToFile2) => {
    console.log(genDiff(pathToFile1, pathToFile2, program.format));
  });

program.parse(process.argv);

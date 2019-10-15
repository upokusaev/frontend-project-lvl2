import _ from 'lodash';
import fs from 'fs';
import genDiff from '../src';
import { normalizeResult } from '../src/tools';

const path = `${__dirname}/__fixtures__`;

test.each([
  ['json', 'tree'], ['json', 'plain'], ['json', 'json'],
  ['yml', 'tree'], ['yml', 'plain'], ['yml', 'json'],
  ['ini', 'tree'], ['ini', 'plain'], ['ini', 'json']])(
  'Comparison of .%s files. Output to "%s" format',
  (exp, format = '') => {
    const capitalizeFormat = _.capitalize(format);
    const before = `${path}/before.${exp}`;
    const after = `${path}/after.${exp}`;
    const received = normalizeResult(genDiff(before, after, format));
    const expected = fs.readFileSync(`${path}/result${capitalizeFormat}`, 'utf-8');
    expect(received).toBe(expected);
  },
);

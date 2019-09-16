import _ from 'lodash';
import fs from 'fs';
import genDiff from '../dist';

const path = `${__dirname}/__fixtures__`;

test.each([
  ['json', 'deep', 'custom'], ['json', 'flat', 'plain'],
  ['yml', 'deep', 'json'], ['yml', 'flat', 'custom'],
  ['ini', 'deep', 'plain'], ['ini', 'flat', 'json']])(
  '%s-%s to %s format',
  (exp, type, format = '') => {
    const capitalizeFormat = _.capitalize(format);
    const before = `${path}/${type}/before.${exp}`;
    const after = `${path}/${type}/after.${exp}`;
    const expected = fs.readFileSync(`${path}/${type}/result${capitalizeFormat}`, 'ascii');
    expect(genDiff(before, after, format)).toBe(expected);
  },
);

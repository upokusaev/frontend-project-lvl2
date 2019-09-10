import fs from 'fs';
import genDiff from '../dist';

test('json', () => {
  const pathResult = '__tests__/__fixtures__/result';
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(strResult);
});

test('yaml', () => {
  const pathResult = '__tests__/__fixtures__/result';
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml')).toBe(strResult);
});

import fs from 'fs';
import genDiff from '../dist';

test('diff', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';
  const pathResult = '__tests__/__fixtures__/result';
  const strResult = fs.readFileSync(pathResult, 'ascii');
  // console.log(genDiff(path1, path2));
  // console.log(strResult);
  expect(genDiff(path1, path2)).toBe(strResult);
});

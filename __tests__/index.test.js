import fs from 'fs';
import genDiff from '../dist';

const flatResult = `${__dirname}/__fixtures__/flat/result`;
const flatPlainResult = `${__dirname}/__fixtures__/flat/resultPlain`;
const flatJsonResult = `${__dirname}/__fixtures__/flat/resultJson`;
const deepResult = `${__dirname}/__fixtures__/deep/result`;
const deepPlainResult = `${__dirname}/__fixtures__/deep/resultPlain`;
const deepJsonResult = `${__dirname}/__fixtures__/deep/resultJson`;


test('json', () => {
  const pathResult = flatResult;
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff(`${__dirname}/__fixtures__/flat/before.json`, `${__dirname}/__fixtures__/flat/after.json`)).toBe(strResult);
});

test('yaml', () => {
  const pathResult = flatResult;
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff(`${__dirname}/__fixtures__/flat/before.yml`, `${__dirname}/__fixtures__/flat/after.yml`)).toBe(strResult);
});

test('ini', () => {
  const pathResult = flatResult;
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff(`${__dirname}/__fixtures__/flat/before.ini`, `${__dirname}/__fixtures__/flat/after.ini`)).toBe(strResult);
});

test('deepJson', () => {
  const pathResult = deepResult;
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff(`${__dirname}/__fixtures__/deep/before.json`, `${__dirname}/__fixtures__/deep/after.json`)).toBe(strResult);
});

test('deepYml', () => {
  const pathResult = deepResult;
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff(`${__dirname}/__fixtures__/deep/before.yml`, `${__dirname}/__fixtures__/deep/after.yml`)).toBe(strResult);
});

test('deepIni', () => {
  const pathResult = deepResult;
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff(`${__dirname}/__fixtures__/deep/before.ini`, `${__dirname}/__fixtures__/deep/after.ini`)).toBe(strResult);
});

test('json to Plain', () => {
  const pathResult = flatPlainResult;
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff(`${__dirname}/__fixtures__/flat/before.json`, `${__dirname}/__fixtures__/flat/after.json`, 'plain')).toBe(strResult);
});

test('deepYml to Plain', () => {
  const pathResult = deepPlainResult;
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff(`${__dirname}/__fixtures__/deep/before.yml`, `${__dirname}/__fixtures__/deep/after.yml`, 'plain')).toBe(strResult);
});

test('yaml to Json', () => {
  const pathResult = flatJsonResult;
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff(`${__dirname}/__fixtures__/flat/before.yml`, `${__dirname}/__fixtures__/flat/after.yml`, 'json')).toBe(strResult);
});

test('deepIni to Json', () => {
  const pathResult = deepJsonResult;
  const strResult = fs.readFileSync(pathResult, 'ascii');
  expect(genDiff(`${__dirname}/__fixtures__/deep/before.ini`, `${__dirname}/__fixtures__/deep/after.ini`, 'json')).toBe(strResult);
});

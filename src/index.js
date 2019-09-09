#!/usr/bin/env node
import fs from 'fs';
import has from 'lodash/has';

const genDiff = (pathFile1, pathFile2) => {
  const obj1 = JSON.parse(fs.readFileSync(pathFile1, 'ascii'));
  const obj2 = JSON.parse(fs.readFileSync(pathFile2, 'ascii'));
  const arr = Object.keys(obj1).reduce((acc, key) => {
    if (!has(obj2, key)) return [...acc, ` - ${key}: ${obj1[key]}`];
    if (obj1[key] === obj2[key]) return [...acc, `   ${key}: ${obj1[key]}`];
    return [...acc, ` + ${key}: ${obj2[key]}`, ` - ${key}: ${obj1[key]}`];
  }, []);
  const res = Object.keys(obj2).reduce((acc, key) => ((!has(obj1, key)) ? [...acc, ` + ${key}: ${obj2[key]}`] : acc), arr);
  return `{\n${res.join('\n')}\n}`;
};

export default genDiff;

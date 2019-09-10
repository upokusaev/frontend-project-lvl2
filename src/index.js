import _ from 'lodash';
import parse from './parsers';


const genDiff = (pathFile1, pathFile2) => {
  const obj1 = parse(pathFile1);
  const obj2 = parse(pathFile2);
  const arr = Object.keys(obj1).reduce((acc, key) => {
    const newValue = `  + ${key}: ${obj2[key]}`;
    const oldValue = `  - ${key}: ${obj1[key]}`;
    const value = `    ${key}: ${obj1[key]}`;
    if (!_.has(obj2, key)) return [...acc, oldValue];
    if (obj1[key] === obj2[key]) return [...acc, value];
    return [...acc, newValue, oldValue];
  }, []);
  const res = Object.keys(obj2).reduce((acc, key) => ((!_.has(obj1, key)) ? [...acc, `  + ${key}: ${obj2[key]}`] : acc), arr);
  return `{\n${res.join('\n')}\n}`;
};

export default genDiff;

import _ from 'lodash';
import parse from './parsers';
import fs from 'fs';

const transformElements = [
  {
    mod: "notСhanged",
    check: (obj1, obj2, key) => (obj1[key] === obj2[key]),
  },
  {
    mod: "removed",
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
  },
  {
    mod: "added",
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    mod: "changed",
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
  }
];

const transformObjects = [
  {
    mod: "removed",
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
  },
  {
    mod: "added",
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    mod: "changed",
    check: (obj1, obj2, key) => (typeof obj1 !== typeof obj2),
  },
  {
    mod: "notСhanged",
    check: (obj1, obj2, key) => (obj1 instanceof Object && obj2 instanceof Object),
  }
];

const getMod = (obj1, obj2, key) => {
  const arrayActions = (obj1[key] instanceof Object) ? transformObjects : transformElements;
  return arrayActions.find(({check}) => check(obj1, obj2, key));
};

const buildAst = (before, after) => {
  const keys = Object.keys(before).concat(Object.keys(after));
  const uniqKeys = Array.from(new Set(keys));
  console.log('b/a: ', before, after);
  const ast = uniqKeys.reduce((acc, key) => {
    const name = key;
    const newValue = after[key];
    const prevValue = before[key];
    console.log('new/old: ', newValue, prevValue);
    const children = (_.isObject(before[key]) && _.isObject(after[key])) ? buildAst(before[key], after[key]) : false;
    const {mod} = getMod(before, after, key);
    console.log('object: ', { name, newValue, prevValue, mod, children });
    return { ...acc, name, newValue, prevValue, mod, children };
  }, {});
  return ast;
};

const genDiff = (pathFile1, pathFile2) => {
  const obj1 = parse(pathFile1);
  const obj2 = parse(pathFile2);



  const res = buildAst(obj1, obj2);
  console.log(res);
};

export default genDiff;

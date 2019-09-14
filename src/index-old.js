import _ from 'lodash';
import parse from './parsers';

const transformElements = [
  {
    transform: "notСhanged",
    check: (obj1, obj2, key) => (obj1[key] === obj2[key]),
    body: (obj1, obj2, key) => obj1[key],
    children: {},
    fchild: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },
  {
    transform: "removed",
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    body: (obj1, obj2, key) => obj1[key],
    children: {},
    fchild: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },
  {
    transform: "added",
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    body: (obj1, obj2, key) => obj2[key],
    children: {},
    fchild: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },
  {
    transform: "changed",
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
    body: (obj1, obj2, key) => [obj1[key], obj2[key]],
    children: {},
    fchild: (obj1, obj2, key) => [obj1[key], obj2[key]],
  }
];

const transformObjects = [
  {
    transform: "removed",
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    fchild: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },
  {
    transform: "added",
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    fchild: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },
  {
    transform: "changed",
    check: (obj1, obj2, key) => (typeof obj1 !== typeof obj2),
    fchild: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },
  {
    transform: "notСhanged",
    check: (obj1, obj2, key) => (obj1 instanceof Object && obj2 instanceof Object),
    fchild: (obj1, obj2, key) => [obj1[key], obj2[key]],
  }
];


const getProperty = (obj1, obj2, key) => {
  const arrayActions = (obj1[key] instanceof Object) ? transformObjects : transformElements;
  return arrayActions.find(({check}) => check(obj1, obj2, key));
};

const buildAst = (before, after) => {
  const keys = Object.keys(before).concat(Object.keys(after));
  const uniqKeys = Array.from(new Set(keys));
  console.log(uniqKeys);
  const ast = uniqKeys.map(key => {
    const {transform, fchild} = getProperty(before, after, key);
    const children = fchild(before, after, key);
    return { name: key, transform, children };
  });
  return ast;
};

const genDiff = (pathFile1, pathFile2) => {
  const obj1 = parse(pathFile1);
  const obj2 = parse(pathFile2);




  console.log(buildAst(obj1, obj2));
  // const res = f(obj1, obj2);
  // return `{\n${res.join('\n')}\n}\n`;
};

export default genDiff;

// const f = (obj1, obj2) => {
//   const arr = Object.keys(obj1).reduce((acc, key) => {
//     const newValue = `  + ${key}: ${obj2[key]}`;
//     const oldValue = `  - ${key}: ${obj1[key]}`;
//     const value = `    ${key}: ${obj1[key]}`;
//     if (!_.has(obj2, key)) return [...acc, oldValue];
//     if (obj1[key] === obj2[key]) return [...acc, value];
//     return [...acc, newValue, oldValue];
//   }, []);
//   return Object.keys(obj2).reduce((acc, key) => ((!_.has(obj1, key)) ? [...acc, `  + ${key}: ${obj2[key]}`] : acc), arr);
// };

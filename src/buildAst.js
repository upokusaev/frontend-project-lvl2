import _ from 'lodash';

const transformElements = [
  {
    mod: 'notСhanged',
    check: (obj1, obj2, key) => (obj1[key] === obj2[key]),
    getValue: (obj1, obj2, key) => obj1[key],
  },
  {
    mod: 'removed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    getValue: (obj1, obj2, key) => obj1[key],
  },
  {
    mod: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    getValue: (obj1, obj2, key) => obj2[key],
  },
  {
    mod: 'changed',
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
    getValue: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },
];

const transformObjects = [
  {
    mod: 'removed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    getValue: (obj1, obj2, key) => obj1[key],
  },
  {
    mod: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    getValue: (obj1, obj2, key) => obj2[key],
  },
  {
    mod: 'notСhanged',
    check: (obj1, obj2, key) => ((_.isObject(obj1) && _.isObject(obj1)) || (obj1[key] === obj2[key])),
    getValue: (obj1, obj2, key) => null,
  },
  {
    mod: 'changed',
    check: (obj1, obj2) => (obj1[key] !== obj2[key]),
    getValue: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },

];

const getMod = (obj1, obj2, key) => {
  const arrayActions = (obj1[key] instanceof Object && obj2[key] instanceof Object) ? transformObjects : transformElements;
  return arrayActions.find(({ check }) => check(obj1, obj2, key));
};

const buildAst = (before, after) => {
  const keys = Object.keys(before).concat(Object.keys(after));
  const uniqKeys = Array.from(new Set(keys)).sort();
  const ast = uniqKeys.map((key) => {
    const name = key;
    const children = (_.isObject(before[key]) && _.isObject(after[key])) ? buildAst(before[key], after[key]) : null;
    const { mod, getValue } = getMod(before, after, key);
    const value = getValue(before, after, key);
    return { name, value, mod, children };
  });
  return ast;
};

export default buildAst;

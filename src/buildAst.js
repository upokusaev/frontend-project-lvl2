import _ from 'lodash';

const isTwoObj = (obj1, obj2) => (_.isObject(obj1) && _.isObject(obj2));

const modifications = [
  {
    mod: 'not',
    check: (obj1, obj2, key) => isTwoObj(obj1[key], obj2[key]),
    getValue: () => null,
  },
  {
    mod: 'not',
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
    mod: 'updated',
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
    getValue: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },
];

const getMod = (obj1, obj2, key) => modifications.find(({ check }) => check(obj1, obj2, key));

const buildAst = (before, after) => {
  const keys = Object.keys(before).concat(Object.keys(after));
  const uniqKeys = Array.from(new Set(keys)).sort();
  const ast = uniqKeys.map((key) => {
    const name = key;
    const children = (isTwoObj(before[key], after[key])) ? buildAst(before[key], after[key]) : null;
    const { mod, getValue } = getMod(before, after, key);
    const value = getValue(before, after, key);
    return {
      name,
      value,
      mod,
      children,
    };
  });
  return ast;
};

export default buildAst;

import _ from 'lodash';

const isTwoObj = (obj1, obj2) => (_.isObject(obj1) && _.isObject(obj2));

const objOfTypes = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => isTwoObj(obj1[key], obj2[key]),
    getValue: () => null,
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => (obj1[key] === obj2[key]),
    getValue: (obj1, obj2, key) => obj1[key],
  },
  {
    type: 'removed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    getValue: (obj1, obj2, key) => obj1[key],
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    getValue: (obj1, obj2, key) => obj2[key],
  },
  {
    type: 'updated',
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
    getValue: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },
];

const getObjType = (obj1, obj2, key) => objOfTypes.find(({ check }) => check(obj1, obj2, key));

const buildAst = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after)).sort();
  const ast = keys.map((key) => {
    const name = key;
    const { type, getValue } = getObjType(before, after, key);
    const children = (type === 'nested') ? buildAst(before[key], after[key]) : null;
    const value = getValue(before, after, key);
    return {
      name,
      value,
      type,
      children,
    };
  });
  return ast;
};

export default buildAst;

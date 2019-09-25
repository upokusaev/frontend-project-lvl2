import _ from 'lodash';

const isTwoObj = (obj1, obj2) => (_.isObject(obj1) && _.isObject(obj2));

const objOfTypes = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => isTwoObj(obj1[key], obj2[key]),
    getArrValues: () => [null, null],
    getChildren: (obj1, obj2, key, buildFunc) => buildFunc(obj1[key], obj2[key]),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => (obj1[key] === obj2[key]),
    getArrValues: (obj1, obj2, key) => [obj1[key], null],
    getChildren: () => null,
  },
  {
    type: 'removed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    getArrValues: (obj1, obj2, key) => [null, obj1[key]],
    getChildren: () => null,
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    getArrValues: (obj1, obj2, key) => [obj2[key], null],
    getChildren: () => null,
  },
  {
    type: 'updated',
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
    getArrValues: (obj1, obj2, key) => [obj2[key], obj1[key]],
    getChildren: () => null,
  },
];

const getObjType = (obj1, obj2, key) => objOfTypes.find(({ check }) => check(obj1, obj2, key));

const buildAst = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after)).sort();
  const ast = keys.map((key) => {
    const name = key;
    const { type, getArrValues, getChildren } = getObjType(before, after, key);
    const children = getChildren(before, after, key, buildAst);
    const arrValues = getArrValues(before, after, key);
    const [value, oldValue] = arrValues;
    return {
      name,
      value,
      oldValue,
      type,
      children,
    };
  });
  return ast;
};

export default buildAst;

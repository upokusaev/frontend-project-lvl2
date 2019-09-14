import _ from 'lodash';

const transformElements = [
  {
    mod: 'notСhanged',
    check: (obj1, obj2, key) => (obj1[key] === obj2[key]),
  },
  {
    mod: 'removed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
  },
  {
    mod: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    mod: 'changed',
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
  },
];

const transformObjects = [
  {
    mod: 'removed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
  },
  {
    mod: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    mod: 'changed',
    check: (obj1, obj2) => (typeof obj1 !== typeof obj2),
  },
  {
    mod: 'notСhanged',
    check: (obj1, obj2) => (obj1 instanceof Object && obj2 instanceof Object),
  },
];

const getMod = (obj1, obj2, key) => {
  const arrayActions = (obj1[key] instanceof Object) ? transformObjects : transformElements;
  return arrayActions.find(({ check }) => check(obj1, obj2, key));
};

const buildAst = (before, after) => {
  const keys = Object.keys(before).concat(Object.keys(after));
  const uniqKeys = Array.from(new Set(keys)).sort();
  const ast = uniqKeys.reduce((acc, key) => {
    const name = key;
    const newValue = after[key];
    const prevValue = before[key];
    const child = (_.isObject(before[key]) && _.isObject(after[key])) ? [before[key], after[key]] : false;
    const { mod } = getMod(before, after, key);
    return { ...acc, [name]: { newValue, prevValue, mod, children: (child ? buildAst(child[0], child[1]) : false) } };
  }, {});
  return ast;
};

export default buildAst;

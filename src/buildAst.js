import _ from 'lodash';

const isTwoObj = (obj1, obj2) => (_.isObject(obj1) && _.isObject(obj2));

const objOfTypes = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => isTwoObj(obj1[key], obj2[key]),
    getContent: (obj1, obj2, key, build) => ({ children: build(obj1[key], obj2[key]) }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => (obj1[key] === obj2[key]),
    getContent: (obj1, obj2, key) => ({ newValue: obj1[key], oldValue: null }),
  },
  {
    type: 'removed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    getContent: (obj1, obj2, key) => ({ newValue: null, oldValue: obj1[key] }),
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    getContent: (obj1, obj2, key) => ({ newValue: obj2[key], oldValue: null }),
  },
  {
    type: 'updated',
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
    getContent: (obj1, obj2, key) => ({ newValue: obj2[key], oldValue: obj1[key] }),
  },
];

const getObjType = (obj1, obj2, key) => objOfTypes.find(({ check }) => check(obj1, obj2, key));

const buildAst = (objBefore, objAfter) => {
  const keys = _.union(Object.keys(objBefore), Object.keys(objAfter)).sort();
  const ast = keys.map((key) => {
    const name = key;
    const { type, getContent } = getObjType(objBefore, objAfter, key);
    const content = getContent(objBefore, objAfter, key, buildAst);
    return { name, type, ...content };
  });
  return ast;
};

export default buildAst;

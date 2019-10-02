import _ from 'lodash';

const isTwoObj = (obj1, obj2) => (_.isObject(obj1) && _.isObject(obj2));

const objOfTypes = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => isTwoObj(obj1[key], obj2[key]),
    getContent: (obj1, obj2, key) => [obj1[key], obj2[key]],
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => (obj1[key] === obj2[key]),
    getContent: (obj1, obj2, key) => [obj1[key], null],
  },
  {
    type: 'removed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    getContent: (obj1, obj2, key) => [null, obj1[key]],
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    getContent: (obj1, obj2, key) => [obj2[key], null],
  },
  {
    type: 'updated',
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
    getContent: (obj1, obj2, key) => [obj2[key], obj1[key]],
  },
];

const getObjType = (obj1, obj2, key) => objOfTypes.find(({ check }) => check(obj1, obj2, key));

const buildAst = (objBefore, objAfter) => {
  const keys = _.union(Object.keys(objBefore), Object.keys(objAfter)).sort();
  const ast = keys.map((key) => {
    const name = key;
    const { type, getContent } = getObjType(objBefore, objAfter, key);
    const [content1, content2] = getContent(objBefore, objAfter, key);
    const children = (type === 'nested') ? buildAst(content1, content2) : null;
    const [newValue, oldValue] = (type === 'nested') ? [null, null] : [content1, content2];
    return (children === null) ? {
      name, type, newValue, oldValue,
    } : {
      name, type, children,
    };
  });
  return ast;
};

export default buildAst;

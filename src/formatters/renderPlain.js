import { normalizeResult } from '../tools';

const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return (typeof value === 'string') ? `'${value}'` : value;
};

const render = (diff, deepName) => {
  const resArr = diff.reduce((acc, obj) => {
    const name = (deepName) ? `${deepName}.${obj.name}` : obj.name;
    switch (obj.type) {
      case 'nested':
        return [...acc, ...render(obj.children, name)];
      case 'updated':
        return [...acc, `Property '${name}' was ${obj.type}. From ${stringify(obj.oldValue)} to ${stringify(obj.newValue)}`];
      case 'added':
        return [...acc, `Property '${name}' was ${obj.type} with value: ${stringify(obj.newValue)}`];
      case 'removed':
        return [...acc, `Property '${name}' was ${obj.type}`];
      default:
        return acc;
    }
  }, []);
  return resArr;
};

export default (diff) => {
  const resArr = render(diff);
  const str = resArr.join('\n');
  return normalizeResult(str);
};

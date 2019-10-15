import _ from 'lodash';

const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return (typeof value === 'string') ? `'${value}'` : value;
};

const render = (diff, deepName) => {
  const deepResult = diff.map((obj) => {
    const name = (deepName) ? `${deepName}.${obj.name}` : obj.name;
    switch (obj.type) {
      case 'nested':
        return render(obj.children, name);
      case 'updated':
        return `Property '${name}' was ${obj.type}. From ${stringify(obj.oldValue)} to ${stringify(obj.newValue)}`;
      case 'added':
        return `Property '${name}' was ${obj.type} with value: ${stringify(obj.newValue)}`;
      case 'removed':
        return `Property '${name}' was ${obj.type}`;
      case 'unchanged':
        return null;
      default:
        return new Error('Wrong type');
    }
  }).filter((el) => el);

  const result = _.flattenDeep(deepResult);
  return result;
};

export default (diff) => render(diff).join('\n');

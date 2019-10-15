import _ from 'lodash';

const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return (typeof value === 'string') ? `'${value}'` : value;
};

const render = (diff, deepName) => {
  const deepResult = diff.map((obj) => {
    const name = (deepName) ? `${deepName}.${obj.name}` : obj.name;
    let str = '';
    switch (obj.type) {
      case 'nested':
        str = render(obj.children, name);
        break;
      case 'updated':
        str = `Property '${name}' was ${obj.type}. From ${stringify(obj.oldValue)} to ${stringify(obj.newValue)}`;
        break;
      case 'added':
        str = `Property '${name}' was ${obj.type} with value: ${stringify(obj.newValue)}`;
        break;
      case 'removed':
        str = `Property '${name}' was ${obj.type}`;
        break;
      case 'unchanged':
        str = null;
        break;
      default:
        console.log('Error');
    }
    return str;
  }).filter((el) => el);
  const result = _.flattenDeep(deepResult);
  return result;
};

export default (diff) => render(diff).join('\n');

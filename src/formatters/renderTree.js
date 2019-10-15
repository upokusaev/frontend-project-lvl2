import _ from 'lodash';

const tab = '    ';
const getPrefix = (obj) => {
  switch (obj.type) {
    case 'removed': return '  - ';
    case 'added': return '  + ';
    case 'updated': return ['  - ', '  + '];
    default: return '    ';
  }
};

const expandValue = (obj, depth) => {
  const res = Object.keys(obj).map((key) => `${tab.repeat(depth + 1)}${key}: ${obj[key]}`);
  return `{\n${res.join('\n')}\n${tab.repeat(depth)}}`;
};

const getValue = (value, depth) => {
  if (value instanceof Object) return expandValue(value, depth + 1);
  return value;
};

const render = (diff, depth = 0) => {
  const deepResult = diff.map((obj) => {
    const prefix = getPrefix(obj);
    const name = `${tab.repeat(depth)}${prefix}${obj.name}: `;
    switch (obj.type) {
      case 'nested':
        return `${name}${render(obj.children, depth + 1)}`;
      case 'updated': {
        return [
          `${tab.repeat(depth)}${prefix[0]}${obj.name}: ${getValue(obj.oldValue, depth)}`,
          `${tab.repeat(depth)}${prefix[1]}${obj.name}: ${getValue(obj.newValue, depth)}`];
      }
      case 'removed':
        return `${name}${getValue(obj.oldValue, depth)}`;
      case 'added':
        return `${name}${getValue(obj.newValue, depth)}`;
      case 'unchanged':
        return `${name}${getValue(obj.newValue, depth)}`;
      default:
        return new Error('Wrong type');
    }
  });

  const result = _.flattenDeep(deepResult);
  return `{\n${result.join('\n')}\n${tab.repeat(depth)}}`;
};

export default render;

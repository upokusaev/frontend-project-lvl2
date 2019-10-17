import _ from 'lodash';

const tab = '    ';

const stringify = (obj, depth) => {
  const res = Object.keys(obj).map((key) => `${tab.repeat(depth + 1)}${key}: ${obj[key]}`);
  return `{\n${res.join('\n')}\n${tab.repeat(depth)}}`;
};

const getValue = (value, depth) => (
  (value instanceof Object) ? stringify(value, depth + 1) : value
);

const render = (diff, depth = 0) => {
  const deepResult = diff.map((obj) => {
    switch (obj.type) {
      case 'nested':
        return `${tab.repeat(depth)}    ${obj.name}: ${render(obj.children, depth + 1)}`;
      case 'updated': {
        return [
          `${tab.repeat(depth)}  - ${obj.name}: ${getValue(obj.oldValue, depth)}`,
          `${tab.repeat(depth)}  + ${obj.name}: ${getValue(obj.newValue, depth)}`];
      }
      case 'removed':
        return `${tab.repeat(depth)}  - ${obj.name}: ${getValue(obj.oldValue, depth)}`;
      case 'added':
        return `${tab.repeat(depth)}  + ${obj.name}: ${getValue(obj.newValue, depth)}`;
      case 'unchanged':
        return `${tab.repeat(depth)}    ${obj.name}: ${getValue(obj.newValue, depth)}`;
      default:
        throw new Error(`Error: unexpected type "${obj.type}"`);
    }
  });

  const result = _.flattenDeep(deepResult);
  return `{\n${result.join('\n')}\n${tab.repeat(depth)}}`;
};

export default render;

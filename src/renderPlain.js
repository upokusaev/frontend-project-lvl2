const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return (typeof value === 'string') ? `'${value}'` : value;
};

const render = (diff, deepName) => {
  const res = diff.reduce((acc, obj) => {
    const name = (deepName) ? `${deepName}.${obj.name}` : obj.name;
    if (obj.type === 'nested') return `${acc}${render(obj.children, name)}`;
    const { value } = obj;
    if (obj.type === 'updated') return `${acc}Property '${name}' was ${obj.type}. From ${stringify(value[0])} to ${stringify(value[1])}\n`;
    if (obj.type === 'added') return `${acc}Property '${name}' was ${obj.type} with value: ${stringify(value)}\n`;
    return (obj.type === 'removed') ? `${acc}Property '${name}' was ${obj.type}\n` : acc;
  }, '');

  return res;
};

export default render;

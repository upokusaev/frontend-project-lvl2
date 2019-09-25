const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return (typeof value === 'string') ? `'${value}'` : value;
};

const render = (diff, deepName) => {
  const res = diff.reduce((acc, obj) => {
    const name = (deepName) ? `${deepName}.${obj.name}` : obj.name;
    if (obj.type === 'nested') return `${acc}${render(obj.children, name)}`;
    if (obj.type === 'updated') return `${acc}Property '${name}' was ${obj.type}. From ${stringify(obj.oldValue)} to ${stringify(obj.value)}\n`;
    if (obj.type === 'added') return `${acc}Property '${name}' was ${obj.type} with value: ${stringify(obj.value)}\n`;
    return (obj.type === 'removed') ? `${acc}Property '${name}' was ${obj.type}\n` : acc;
  }, '');

  return res;
};

export default render;

const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return (typeof value === 'string') ? `'${value}'` : value;
};

const render = (diff, deepName) => {
  const res = diff.reduce((acc, obj) => {
    const name = (deepName) ? `${deepName}.${obj.name}` : obj.name;
    if (obj.children) return `${acc}${render(obj.children, name)}`;
    const { value } = obj;
    if (obj.mod === 'updated') return `${acc}Property '${name}' was ${obj.mod}. From ${stringify(value[0])} to ${stringify(value[1])}\n`;
    if (obj.mod === 'added') return `${acc}Property '${name}' was ${obj.mod} with value: ${stringify(value)}\n`;
    return (obj.mod === 'removed') ? `${acc}Property '${name}' was ${obj.mod}\n` : acc;
  }, '');

  return res;
};

export default render;

const expandValue = (obj) => {
  const res = Object.keys(obj).map((key) => `"${key}": "${obj[key]}"`);
  return `{ ${res.join(', ')} }`;
};

const getValue = (value) => {
  if (value instanceof Array) return `"value": [ {${getValue(value[0])}}, {${getValue(value[1])}} ]`;
  if (value instanceof Object) return `"value": ${expandValue(value)}`;
  return (value === null) ? '"value": ""' : `"value": "${value}"`;
};

const render = (diff) => {
  const res = Object.keys(diff).map((key) => {
    const obj = diff[key];
    const name = `"name": "${obj.name}"`;
    const type = `"type": "${obj.type}"`;
    const value = getValue(obj.value);
    const children = (obj.children) ? `"children": ${render(obj.children)}` : '"children": ""';
    return (obj.children) ? `{ ${name}, ${type}, ${value}, ${children} }` : `{ ${name}, ${type}, ${children}, ${value} }`;
  });
  return `[${res.join(',')}]`;
};

const normalizeResult = (diff) => `${render(diff)}\n`;

export default normalizeResult;

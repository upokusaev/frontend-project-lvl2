const expandValue = (value) => {
  if (value instanceof Object) {
    const obj = value;
    const res = Object.keys(obj).map((key) => `"${key}": "${obj[key]}"`);
    return `{ ${res.join(', ')} }`;
  }
  return (value === null) ? '""' : `"${value}"`;
};

const getValue = (obj) => {
  if (obj.type === 'updated') return `"value": ${expandValue(obj.value)}, "oldValue": ${expandValue(obj.oldValue)} `;
  const value = (obj.type === 'removed') ? obj.oldValue : obj.value;
  return `"value": ${expandValue(value)}`;
};

const render = (diff) => {
  const res = Object.keys(diff).map((key) => {
    const obj = diff[key];
    const name = `"name": "${obj.name}"`;
    const type = `"type": "${obj.type}"`;
    const value = getValue(obj);
    const children = (obj.children) ? `"children": ${render(obj.children)}` : '"children": ""';
    return (obj.children) ? `{ ${name}, ${type}, ${value}, ${children} }` : `{ ${name}, ${type}, ${children}, ${value} }`;
  });
  return `[${res.join(',')}]`;
};

const normalizeResult = (diff) => `${render(diff)}\n`;

export default normalizeResult;

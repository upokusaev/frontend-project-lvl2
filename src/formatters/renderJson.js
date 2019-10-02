const expandValue = (value) => {
  if (value instanceof Object) {
    const obj = value;
    const res = Object.keys(obj).map((key) => `"${key}": "${obj[key]}"`);
    return `{ ${res.join(', ')} }`;
  }
  return (value === null) ? '""' : `"${value}"`;
};

const getValue = (obj) => {
  if (obj.type === 'updated') return `"newValue": ${expandValue(obj.newValue)}, "oldValue": ${expandValue(obj.oldValue)} `;
  const value = (obj.type === 'removed') ? obj.oldValue : obj.newValue;
  return `"value": ${expandValue(value)}`;
};

const render = (diff) => {
  const res = Object.keys(diff).map((key) => {
    const obj = diff[key];
    const name = `"name": "${obj.name}"`;
    const type = `"type": "${obj.type}"`;
    const content = (obj.type === 'nested') ? `"children": ${render(obj.children)}` : getValue(obj);
    return `{ ${name}, ${type}, ${content} }`;
  });
  return `[${res.join(',')}]`;
};

const normalizeResult = (diff) => `${render(diff)}\n`;

export default normalizeResult;

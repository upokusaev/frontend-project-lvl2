const getPrefix = (obj) => {
  switch (obj.type) {
    case 'removed': return '  - ';
    case 'added': return '  + ';
    case 'updated': return ['  - ', '  + '];
    default: return '    ';
  }
};

const tab = '    ';

const expandValue = (obj, level) => {
  const res = Object.keys(obj).map((key) => `${tab.repeat(level + 1)}${key}: ${obj[key]}`);
  return `{\n${res.join('\n')}\n${tab.repeat(level)}}`;
};

const getValue = (value, level) => {
  if (value instanceof Object) return expandValue(value, level + 1);
  return value;
};

const render = (diff, level = 0) => {
  const res = diff.map((obj) => {
    const prefix = getPrefix(obj);
    const startStr = `${tab.repeat(level)}${prefix}${obj.name}: `;
    if (obj.type === 'nested') return `${startStr}${render(obj.children, level + 1)}`;
    if (obj.type === 'updated') return obj.value.map((value, i) => `${tab.repeat(level)}${prefix[i]}${obj.name}: ${getValue(value, level)}`).join('\n');
    return `${startStr}${getValue(obj.value, level, prefix)}`;
  });

  return `{\n${res.join('\n')}\n${tab.repeat(level)}}`;
};

const normalizeRezult = (diff) => `${render(diff)}\n`;

export default normalizeRezult;

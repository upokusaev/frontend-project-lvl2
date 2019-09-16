const tab = '    ';

const getPrefix = (obj) => {
  switch (obj.mod) {
    case 'removed': return '  - ';
    case 'added': return '  + ';
    case 'not': return '    ';
    case 'updated': return ['  - ', '  + '];
    default: return '';
  }
};

const renderObj = (obj, level) => {
  const keys = Object.keys(obj);
  const res = keys.map((key) => `${tab.repeat(level + 1)}${key}: ${obj[key]}`);
  return `{\n${res.join('\n')}\n${tab.repeat(level)}}`;
};

const getValue = (value, level) => {
  if (value instanceof Object) return renderObj(value, level + 1);
  return value;
};

const render = (diff, level = 0) => {
  const res = diff.map((obj) => {
    const prefix = getPrefix(obj);
    const startStr = `${tab.repeat(level)}${prefix}${obj.name}: `;
    if (obj.children) {
      return `${startStr}${render(obj.children, level + 1)}`;
    }
    if (obj.value instanceof Array) {
      const [value1, value2] = [getValue(obj.value[0], level), getValue(obj.value[1], level)];
      return `${tab.repeat(level)}${prefix[0]}${obj.name}: ${value1}\n${tab.repeat(level)}${prefix[1]}${obj.name}: ${value2}`;
    }
    return `${startStr}${getValue(obj.value, level)}`;
  });

  return `{\n${res.join('\n')}\n${tab.repeat(level)}}`;
};

const normalizeRezult = (diff) => `${render(diff)}\n`;

export default normalizeRezult;

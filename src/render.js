const f = [
  {
    mod: 'removed',
    prefix: '  - ',
    value: (obj) => obj['prevValue'],
  },
  {
    mod: 'added',
    prefix: '  + ',
    value: (obj) => obj['newValue'],
  },
  {
    mod: 'notСhanged',
    prefix: '    ',
    value: (obj) => obj['newValue'],
  },
  {
    mod: 'changed',
    prefix: ['  + ', '  - '],
    value: (obj) => [obj['newValue'], obj['prevValue']],
  }
];

const tab = '    ';
const getPrefix = (obj) => {
  if (obj['mod'] === 'removed') return '  - ';
  if (obj['mod'] === 'added') return '  + ';
  if (obj['mod'] === 'notСhanged') return '    ';
  if (obj['mod'] === 'changed') return ['  - ', '  + '];
}

const renderObj = (obj, level) => {
  const keys = Object.keys(obj);
  const res = keys.map((key) => {
    if (obj[key] instanceof Object) return `${tab.repeat(level)}${key}: {\n${renderObj(obj[key], level + 1)}\n${tab.repeat(level)}}`;
    return `${tab.repeat(level)}${key}: ${obj[key]}`;
  });
  return res.join('\n');
};

const render = (diff, level = 0) => {
  const res = diff.map((obj) => {
    const prefix = getPrefix(obj);
    if (obj['children']) {
      const str = `${tab.repeat(level)}${prefix}${obj['name']}: {\n${render(obj['children'], level + 1)}\n${tab.repeat(level + 1)}}`;
      return str;
    }
    const value = obj['value'];
    if (value instanceof Array) {
      const value1 = (value[0] instanceof Object) ? `{\n${renderObj(value[0], level + 2)}\n${tab.repeat(level + 1)}}` : value[0];
      const value2 = (value[1] instanceof Object) ? `{\n${renderObj(value[1], level + 2)}\n${tab.repeat(level + 1)}}` : value[1];
      const str = `${tab.repeat(level)}${prefix[0]}${obj['name']}: ${value1}\n${tab.repeat(level)}${prefix[1]}${obj['name']}: ${value2}`;
      return str;
    }
    if (value instanceof Object) {
      const str = `${tab.repeat(level)}${prefix}${obj['name']}: {\n${renderObj(value, level + 2)}\n${tab.repeat(level + 1)}}`;
      return str;
    }
    const str = `${tab.repeat(level)}${prefix}${obj['name']}: ${value}`;
    return str;
  });

  return res.join('\n');
};

const renderResult = (diff) => `{\n${render(diff)}\n}\n`;

export default renderResult;

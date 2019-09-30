import yaml from 'js-yaml';
import ini from 'ini';

const funcList = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.ini': ini.parse,
};

const parse = (data, ext) => {
  const parseFunc = funcList[ext];
  return parseFunc(data);
};

export default parse;

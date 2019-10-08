import yaml from 'js-yaml';
import ini from 'ini';

const functions = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.ini': ini.parse,
};

const parse = (data, ext) => {
  const parseFunc = functions[ext];
  return parseFunc(data);
};

export default parse;

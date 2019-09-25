import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const funcList = {
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.load(data),
  ini: (data) => ini.parse(data),
};

const getData = (filePath) => fs.readFileSync(filePath, 'utf-8');
const getExtName = (filePath) => path.extname(filePath).slice(1);

const parse = (filePath) => {
  const data = getData(filePath);
  const extname = getExtName(filePath);
  const parseFunc = funcList[extname];
  return parseFunc(data);
};

export default parse;

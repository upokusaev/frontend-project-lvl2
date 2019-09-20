import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const funcList = {
  json: (filePath) => JSON.parse(fs.readFileSync(filePath, 'ascii')),
  yml: (filePath) => yaml.load(fs.readFileSync(filePath, 'ascii')),
  ini: (filePath) => ini.parse(fs.readFileSync(filePath, 'ascii')),
};


const parse = (filePath) => {
  const parseFunc = funcList[path.extname(filePath).slice(1)];
  return parseFunc(filePath);
};

export default parse;

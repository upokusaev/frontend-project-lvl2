import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const funcList = {
  json: (pathFile) => JSON.parse(fs.readFileSync(pathFile, 'ascii')),
  yml: (pathFile) => yaml.load(fs.readFileSync(pathFile, 'ascii')),
};

const parse = (filePath) => funcList[path.extname(filePath).slice(1)](filePath);

export default parse;

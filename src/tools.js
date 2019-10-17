import fs from 'fs';
import path from 'path';

export const getData = (filePath) => fs.readFileSync(filePath, 'utf-8');
export const getExt = (filePath) => path.extname(filePath);

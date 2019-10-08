import parse from './parsers';
import buildAst from './buildAst';
import getRenderFunction from './formatters';
import { getData, getExt } from './tools';

const genDiff = (pathFile1, pathFile2, format) => {
  const data1 = getData(pathFile1);
  const data2 = getData(pathFile2);
  const ext1 = getExt(pathFile1);
  const ext2 = getExt(pathFile2);
  const obj1 = parse(data1, ext1);
  const obj2 = parse(data2, ext2);
  const diff = buildAst(obj1, obj2);
  const render = getRenderFunction(format);
  return render(diff);
};

export default genDiff;

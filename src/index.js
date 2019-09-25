import parse from './parsers';
import buildAst from './buildAst';
import geRenderFunction from './formatters/index';

const genDiff = (pathFile1, pathFile2, format) => {
  const obj1 = parse(pathFile1);
  const obj2 = parse(pathFile2);
  const diff = buildAst(obj1, obj2);
  const render = geRenderFunction(format);
  return render(diff);
};

export default genDiff;

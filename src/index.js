import parse from './parsers';
import buildAst from './buildAst';
import renderCustomString from './renderCustomString';
import renderJson from './renderJson';
import renderPlain from './renderPlain';

const geRenderFunction = (format) => {
  switch (format) {
    case 'plain':
      return renderPlain;
    case 'json':
      return renderJson;
    default:
      return renderCustomString;
  }
};

const genDiff = (pathFile1, pathFile2, format) => {
  const obj1 = parse(pathFile1);
  const obj2 = parse(pathFile2);
  const diff = buildAst(obj1, obj2);
  const render = geRenderFunction(format);
  return render(diff);
};

export default genDiff;

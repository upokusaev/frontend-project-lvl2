import _ from 'lodash';
import parse from './parsers';
import buildAst from './buildAst';
import render from './render';

const genDiff = (pathFile1, pathFile2) => {
  const obj1 = parse(pathFile1);
  const obj2 = parse(pathFile2);
  const diff = buildAst(obj1, obj2);
  // console.log(obj1, obj2);
  // console.log(diff);
  return render(diff);
};

export default genDiff;

import { normalizeResult } from '../tools';

const render = (diff) => {
  const str = JSON.stringify(diff);
  return normalizeResult(str);
};

export default render;

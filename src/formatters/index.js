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

export default geRenderFunction;

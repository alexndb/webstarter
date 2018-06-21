import checkElementExist from '../../checkElementExist';

export default  (offsetTop) => {
  if (checkElementExist($('.c-header.sticky'))) {
    return $('.c-header.sticky').innerHeight() + offsetTop;
  } else {
    return offsetTop;
  }
}
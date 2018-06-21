import checkElementExist from '../../checkElementExist';
import checkStickyHeader from './checkStickyHeader';

export default (stickyElement, stickyParent, stickyActiveResolution, offsetTop) => {
  let ww = $(window).innerWidth();
  
  if (checkElementExist($(stickyElement))) {
    if (ww > stickyActiveResolution) {
      $(stickyElement).stick_in_parent({
        offset_top: checkStickyHeader(offsetTop),
        parent: $(stickyParent)
      });
    } else {
      $(stickyElement).trigger("sticky_kit:detach");
    }
  }
}
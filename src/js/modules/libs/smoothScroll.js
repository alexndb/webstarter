import SmoothScroll from 'smooth-scroll/dist/smooth-scroll.polyfills';
import gumshoe from 'gumshoejs/dist/js/gumshoe';
import $ from 'jquery';

export default () => {
  const links = document.querySelectorAll('.js-scroll');
  const stickyHeaderSelector = '.header.sticky';

  for (const link of links) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      $.magnificPopup.close();
    });
  }

  new SmoothScroll('.js-scroll', {
    updateURL: false,
    header: stickyHeaderSelector
  });

  gumshoe.init({
    selector: '.js-scroll',
    selectorHeader: stickyHeaderSelector
  });
}
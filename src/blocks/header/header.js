export default () => {
  let header = document.querySelector('.header');

  if (header) {
    let headerHeight = header.offsetHeight;
    let stickyHeaderContainer = document.querySelector('.wrapper');
    let stickyHeader = stickyHeaderContainer.appendChild(header.cloneNode(true));

    stickyHeader.style.top = -headerHeight + 'px';
    stickyHeader.classList.add('sticky');

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > headerHeight) {
        stickyHeader.classList.add('show');
        stickyHeader.style.top = '0';
      } else {
        stickyHeader.classList.remove('show');
        stickyHeader.style.top = -headerHeight + 'px';
      }
    });
  }
}
export default () => {
  let header = document.querySelector('.c-header');
  let headerHeight = header.offsetHeight;
  let stickyHeader = document.body.appendChild(header.cloneNode(true));
  
  stickyHeader.style.top = -headerHeight + 'px';
  stickyHeader.classList.add('sticky');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
      stickyHeader.classList.add('show');
      stickyHeader.style.top = 0;
    } else {
      stickyHeader.classList.remove('show');
      stickyHeader.style.top = -headerHeight + 'px';
    }
  });
}
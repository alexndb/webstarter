import {asideOpen} from '../aside/aside'

export default () => {
  const header = document.querySelector('.header')

  if (header) {
    let headerHeight = header.offsetHeight
    const stickyHeaderContainer = document.querySelector('body')
    const stickyHeader = stickyHeaderContainer.insertAdjacentElement('afterbegin', header.cloneNode(true))
    const stickyHeaderBurger = stickyHeader.querySelector('.js-aside-open')
    const setHeaderTopStyle = (value) => {
      stickyHeader.style.top = `${value}px`
    }

    setHeaderTopStyle(-headerHeight)
    stickyHeader.classList.add('sticky')

    if (stickyHeaderBurger) {
      stickyHeaderBurger.addEventListener('click', asideOpen)
    }

    window.addEventListener('scroll', () => {
      headerHeight = header.offsetHeight

      if (window.pageYOffset > headerHeight) {
        stickyHeader.classList.add('show')
        setHeaderTopStyle('0')
      } else {
        stickyHeader.classList.remove('show')
        setHeaderTopStyle(-headerHeight)
      }
    })
  }
}
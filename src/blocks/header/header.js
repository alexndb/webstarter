import {asideOpen} from '../aside/aside.js'

export default (() => {
  const header = document.querySelector('.header')

  if (header) {
    const headerHeight = () => header?.getBoundingClientRect().height || 0
    const stickyHeaderContainer = document.querySelector('body')
    const stickyHeader = stickyHeaderContainer.insertAdjacentElement('afterbegin', header.cloneNode(true))
    const stickyHeaderBurger = stickyHeader.querySelector('.js-aside-open')
    const setHeaderTopStyle = value => {
      stickyHeader.style.top = `${value}px`
    }

    setHeaderTopStyle(-headerHeight())
    stickyHeader.classList.add('sticky')

    if (stickyHeaderBurger) {
      stickyHeaderBurger.addEventListener('click', asideOpen)
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > headerHeight()) {
        stickyHeader.classList.add('show')
        setHeaderTopStyle(0)
      } else {
        stickyHeader.classList.remove('show')
        setHeaderTopStyle(-headerHeight())
      }
    })
  }
})()
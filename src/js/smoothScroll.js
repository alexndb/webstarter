import SmoothScroll from 'smooth-scroll/dist/smooth-scroll.polyfills'
import Gumshoe from 'gumshoejs/dist/gumshoe'
import {asideClose} from '../blocks/aside/aside'

export default () => {
  const scrollLinksSelector = '.js-scroll'
  const links = document.querySelectorAll(scrollLinksSelector)

  const getStickyHeaderHeight = () => {
    const stickyHeader = document.querySelector('.header.sticky')
    let stickyHeaderheight = 0

    if (stickyHeader) {
      stickyHeaderheight = stickyHeader.offsetHeight - 1
    }

    return stickyHeaderheight
  }

  const checkBlockExist = () => {
    let blockExist = false

    for (const link of links) {
      if (link.attributes.href.value !== '#' && document.querySelector(link.attributes.href.value)) {
        blockExist = true
      }
    }

    return blockExist
  }

  if (links.length && checkBlockExist()) {
    for (const link of links) {
      link.addEventListener('click', () => {
        asideClose()
      })
    }

    new SmoothScroll(scrollLinksSelector, {
      updateURL: false,
      offset: getStickyHeaderHeight
    })

    new Gumshoe(scrollLinksSelector, {
      offset: getStickyHeaderHeight
    })
  }
}
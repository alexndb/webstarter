import SmoothScroll from 'smooth-scroll/dist/smooth-scroll.polyfills'
import Gumshoe from 'gumshoejs/dist/gumshoe'

import {asideClose} from '../blocks/aside/aside'

export default (() => {
  const stickyElements = ['header.sticky', 'aside']
  const scrollLinksSelector = '.js-scroll'
  const links = document.querySelectorAll(scrollLinksSelector)

  const getStickyElementHeight = (selector) => {
    const stickyElement = document.querySelector(selector)
    let stickyElementheight = 0

    if (stickyElement) {
      stickyElementheight = stickyElement.offsetHeight - 1
    }

    return stickyElementheight
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
      link.addEventListener('click', asideClose)
    }

    new SmoothScroll(scrollLinksSelector, {
      updateURL: false,
      offset: getStickyElementHeight(stickyElements[0])
    })

    for (const item of stickyElements) {
      new Gumshoe(`${item} ${scrollLinksSelector}`, {
        offset: getStickyElementHeight(stickyElements[0])
      })
    }
  }
})()
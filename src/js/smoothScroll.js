import Gumshoe from 'gumshoejs'
import {asideClose} from '../blocks/aside/aside'

export default (() => {
  const stickyElements = ['header.sticky', 'aside']
  const scrollLinksSelector = '.js-scroll'
  const links = document.querySelectorAll(scrollLinksSelector)

  const getStickyElementHeight = (selector) => {
    const stickyElement = document.querySelector(selector)
    let stickyElementheight = 0

    if (stickyElement) {
      stickyElementheight = stickyElement.offsetHeight
    }

    return stickyElementheight
  }

  const checkBlockExist = () => {
    let blockExist = false

    for (const link of links) {
      const hash = link.attributes.href.value

      if (hash !== '#' && document.querySelector(hash)) {
        blockExist = true
      }
    }

    return blockExist
  }

  if (links.length && checkBlockExist()) {
    for (const link of links) {
      link.addEventListener('click', () => {
        const block = document.querySelector(link.attributes.href.value)

        asideClose()
        block.style.scrollMarginTop = `${getStickyElementHeight(stickyElements[0])}px`
      })
    }

    for (const item of stickyElements) {
      new Gumshoe(`${item} ${scrollLinksSelector}`, {
        offset: getStickyElementHeight(stickyElements[0])
      })
    }
  }
})()
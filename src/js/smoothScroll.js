// import Gumshoe from 'gumshoejs'
import {asideClose} from '../blocks/aside/aside.js'

export default (() => {
  const stickyElements = ['header.sticky']
  const scrollLinksSelector = '.js-scroll'
  const links = document.querySelectorAll(scrollLinksSelector)
  const getStickyElementHeight = selector => document.querySelector(selector)?.getBoundingClientRect().height || 0
  const checkBlockExist = ({hash}) => hash !== '#' && hash !== '' && !!document.querySelector(hash)

  if (links.length) {
    for (const link of links) {
      if (checkBlockExist(link)) {
        link.addEventListener('click', () => {
          const block = document.querySelector(link.hash)

          asideClose()
          block.style.scrollMarginTop = `${getStickyElementHeight(stickyElements[0])}px`
        })
      }
    }

    // for (const item of stickyElements) {
    //   new Gumshoe(`${item} ${scrollLinksSelector}`, {
    //     offset: getStickyElementHeight(stickyElements[0])
    //   })
    // }
  }
})()
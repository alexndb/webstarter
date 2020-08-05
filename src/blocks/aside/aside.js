import Hammer from 'hammerjs'

const aside = document.querySelector('.aside')

const asideOpen = (e) => {
  if (aside) {
    e.preventDefault()
    document.body.style.overflow = 'hidden'
    aside.classList.add('aside--active')
  }
}

const asideClose = () => {
  if (aside) {
    aside.classList.remove('aside--active')
    document.body.style.overflow = ''
  }
}

export default (() => {
  if (aside) {
    const asideBg = aside.querySelector('.aside__bg')
    const asideOpenButton = document.querySelector('.js-aside-open')

    const mc = new Hammer.Manager(aside, {
      recognizers: [[Hammer.Swipe]]
    })

    mc.on('swipeleft', asideClose)
    mc.on('swiperight', asideOpen)
    asideBg.addEventListener('click', asideClose)

    if (asideOpenButton) {
      asideOpenButton.addEventListener('click', asideOpen)
    }
  }
})()

export {
  asideOpen,
  asideClose
}
import $ from 'jquery'
import 'magnific-popup'

const popupDefaultOptions = {
  tClose: 'Закрыть (Esc)',
  fixedBgPos: true,
  fixedContentPos: true,
  removalDelay: 300,
  mainClass: 'mfp-fade'
}

const popupOpen = (id) => {
  $.magnificPopup.open({
    ...popupDefaultOptions,
    items: {
      src: `#${id}`,
      type: 'inline'
    }
  })
}

const popupClose = () => {
  $.magnificPopup.close()
}

export default () => {
  const popupLinks = document.querySelectorAll('.js-popup')
  const popupVideoLinks = document.querySelectorAll('.js-popup-video')

  if (popupLinks.length) {
    $(popupLinks).magnificPopup(popupDefaultOptions)
  }

  if (popupVideoLinks.length) {
    $(popupVideoLinks).magnificPopup({
      ...popupDefaultOptions,
      type: 'iframe'
    })
  }
}

export {
  popupOpen,
  popupClose
}
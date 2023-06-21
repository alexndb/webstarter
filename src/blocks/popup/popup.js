import MicroModal from 'micromodal'

export default (() => {
  const defaultOptions = {
    disableScroll: true,
    disableFocus: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
    onShow: (modal, trigger, event) => {
      event.preventDefault()
      const {href} = trigger
      const {description} = trigger.dataset
      const img = modal.querySelector('img')
      const iframe = modal.querySelector('iframe')

      if (img) {
        img.src = href
      }

      if (iframe) {
        iframe.src = href
      }

      if (description) {
        const descriptionElement = modal.querySelector('.popup__img-description')
        descriptionElement.textContent = description
      }
    },
    onClose: modal => {
      const iframe = modal.querySelector('iframe')

      // чистит iframe при закрытии
      if (iframe) {
        const {src} = iframe
        iframe.src = '//about:blank'
        setTimeout(() => {
          iframe.src = src
        }, 100)
      }
    }
  }
  MicroModal.init(defaultOptions)
})()
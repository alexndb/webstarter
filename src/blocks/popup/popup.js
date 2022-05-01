import MicroModal from 'micromodal'

export default (() => {
  const initiators = document.querySelectorAll('[data-micromodal-trigger]')

  if (initiators.length) {
    initiators.forEach(initiator => {
      const {src, description, micromodalTrigger} = initiator.dataset

      initiator.addEventListener('click', () => {
        const img = document.querySelector(`#${micromodalTrigger} img`)
        if (img) {
          img.src = src
        }

        if (description) {
          const descriptionElement = document.querySelector(`#${micromodalTrigger} .popup__img-description`)
          descriptionElement.textContent = description
        }
      })
    })
  }

  const defaultOptions = {
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
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
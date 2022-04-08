import IMask from 'imask'

const phoneMaskedInputInstances = []

export default (() => {
  const phoneInputs = document.querySelectorAll('[type=tel]')
  const inputs = document.querySelectorAll('.input-text input, .input-text textarea')

  if (phoneInputs) {
    for (const input of phoneInputs) {
      const phoneMask = new IMask(input, {
        mask: '+00000000000000000000',
        lazy: true,
        placeholderChar: '_'
      })
      phoneMaskedInputInstances.push(phoneMask)
    }
  }

  if (inputs) {
    const activeClass = 'not-placeholder-shown'

    for (const element of inputs) {
      const checkStatus = () => {
        if (element.value || element.classList.contains('js-datepickerInput')) {
          element.classList.add(activeClass)
        } else {
          element.classList.remove(activeClass)
        }
      }

      checkStatus()
      element.addEventListener('blur', checkStatus)
    }
  }
})()

export {
  phoneMaskedInputInstances
}
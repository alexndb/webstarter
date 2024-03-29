import MicroModal from 'micromodal'
import Validation from './validation.js'

class FormService {
  constructor(selector, options) {
    this.options = options || {}

    for (const form of document.querySelectorAll(selector)) {
      this.onSubmit(form)
      this.onClear(form)
    }
  }

  onSubmit = (form) => {
    form.addEventListener('submit', e => {
      e.preventDefault()

      new Validation(form, this.options)

      if (!form.badForm) {
        this.onFetch(form)
      }
    })
  }

  onClear = (form) => {
    form.addEventListener('reset', () => {
      const inputs = form.querySelectorAll('input, textarea')
      const selects = form.querySelectorAll('select')

      if (inputs) {
        for (const input of inputs) {
          input.classList.remove('not-placeholder-shown')

          if (input.type === 'file') {
            input.clear()
          }

          if (input.iMaskInstance) {
            input.iMaskInstance.value = ''
          }
        }
      }

      if (selects) {
        for (const select of selects) {
          const {choicesInstance} = select
          choicesInstance.setChoiceByValue(choicesInstance._placeholderValue)
        }
      }
    })
  }

  fetchStart = async (form, url, cb) => {
    try {
      const btnSubmit = form.querySelector('button[type=submit]')

      if (btnSubmit) {
        btnSubmit.disabled = true
      }

      const response = await fetch(url, {
        method: 'POST',
        body: new FormData(form)
      })

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }

      cb()

      if (btnSubmit) {
        btnSubmit.disabled = false
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  onFetch = (form) => {
    this.fetchStart(form, 'mail.php', () => {
      const allPopups = document.querySelectorAll('.popup')

      if (allPopups.length) {
        allPopups.forEach(popup => {
          if (popup.classList.contains('is-open')) {
            popup.querySelector('.popup__close').click()
          }
        })
      }

      MicroModal.show('popup-success', {
        disableScroll: true,
        disableFocus: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true
      })
      form.reset()
      // setTimeout(() => {
      //   MicroModal.close('popup-success')
      // }, 5000)
    })
  }
}

export default (() => {
  new FormService('form', {
    lang: document.documentElement.lang,
    validation: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        onlyLetters: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        phone: true
      }
    }
  })
})()
import {popupOpen} from '../popup/popup'
import Validation from './validation'

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
      const response = await fetch(url, {
        method: 'POST',
        body: new FormData(form)
      })

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      cb()
    } catch (error) {
      throw new Error(error)
    }
  }

  onFetch = (form) => {
    this.fetchStart(form, 'mail.php', () => {
      popupOpen('popup-success')
      form.reset()
      // setTimeout(() => {
      //   popupClose()
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
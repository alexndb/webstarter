import {popupOpen, popupClose} from '../popup/popup'
import Validation from './validation'

class FormService {
  constructor(selector, options) {
    this.options = options || {}

    for (const form of document.querySelectorAll(selector)) {
      this.onSubmit(form)
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

  fetchStart = (form, url, cb) => {
    fetch(url, {
      method: 'POST',
      body: new FormData(form)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Запрос отклонен со статусом ${response.status}`)
        } else {
          return response
        }
      })
      .then(cb())
      .catch(err => {
        throw new Error(err.message)
      })
  }

  onFetch = (form) => {
    this.fetchStart(form, 'mail.php', () => {
      popupOpen('popup-success')
      setTimeout(() => {
        form.reset()
        popupClose()
      }, 5000)
    })
  }
}

export default (() => {
  new FormService('form', {
    lang: 'ru',
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
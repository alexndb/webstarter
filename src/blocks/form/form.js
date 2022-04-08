/* eslint-disable class-methods-use-this */
import {popupOpen} from '../popup/popup'
import {phoneMaskedInputInstances} from '../input-text/input-text'
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
      const fileInputPreview = form.querySelector('.input-file__preview')

      for (const input of form.querySelectorAll('input, textarea')) {
        input.classList.remove('not-placeholder-shown')
      }

      phoneMaskedInputInstances?.forEach(instance => {
        instance.value = ''
      })

      if (fileInputPreview) {
        fileInputPreview.innerHTML = ''
        fileInputPreview.previousElementSibling.textContent = 'Прикрепить файл'
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
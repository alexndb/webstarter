import $ from 'jquery'

export default class Validation {
  constructor(form, options) {
    this.form = form
    this.form.badForm = false
    this.formControls = form.querySelectorAll('input, textarea, select')
    this.options = options
    this.validate()
  }

  patterns = {
    digits: /^\d+$/,
    letters: /^[а-яА-ЯёЁa-zA-Z\s]+$/,
    email: /^[a-zA-Z0-9._-]{2,100}@[a-z0-9_-]{2,100}\.[a-z]{2,10}$/,
    phone: /^\+\d\s\d{3}\s\d{3}\s\d{4}$/
  }

  testPattern = (formControl, patternName) => !this.patterns[patternName].test(formControl.value)

  testRequired = (formControl) => {
    let pattern

    if (formControl.tagName === 'INPUT' || formControl.tagName === 'TEXTAREA') {
      pattern = formControl.value === ''
    }

    if (formControl.tagName === 'SELECT') {
      pattern = formControl.selectedIndex === 0
    }

    return pattern
  }

  checkError = (formControl) => {
    if (this.options.validation[formControl.name]) {
      const errors = {
        phone: {
          pattern: this.testPattern(formControl, 'phone'),
          text: {
            ru: 'Формат +9 999 999 9999',
            en: 'Format +9 999 999 9999'
          }
        },
        email: {
          pattern: this.testPattern(formControl, 'email'),
          text: {
            ru: 'Формат youremail@example.com',
            en: 'Format youremail@example.com'
          }
        },
        maxLength: {
          pattern: formControl.value.length > this.options.validation[formControl.name].maxLength,
          text: {
            ru: `Максимальная длина ${this.options.validation[formControl.name].maxLength}`,
            en: `Maximum length ${this.options.validation[formControl.name].maxLength}`
          }
        },
        minLength: {
          pattern: formControl.value.length < this.options.validation[formControl.name].minLength,
          text: {
            ru: `Минимальная длина ${this.options.validation[formControl.name].minLength}`,
            en: `Minimal length ${this.options.validation[formControl.name].minLength}`
          }
        },
        onlyDigits: {
          pattern: this.testPattern(formControl, 'digits'),
          text: {
            ru: 'Только цифры',
            en: 'Only digits'
          }
        },
        onlyLetters: {
          pattern: this.testPattern(formControl, 'letters'),
          text: {
            ru: 'Только буквы',
            en: 'Only letters'
          }
        },
        required: {
          pattern: this.testRequired(formControl),
          text: {
            ru: 'Заполните поле',
            en: 'Enter data'
          }
        }
      }

      const errorCondition = (condition, error) => {
        if (error && condition) {
          this.showError(formControl, error)
        }
      }
      const testRule = (errorName) => {
        if (this.options.validation[formControl.name][errorName]) {
          errorCondition(errors[errorName].pattern, errors[errorName].text[this.options.lang])
        }
      }

      Object.keys(errors).forEach(error => testRule(error))
    }
  }

  showError = (formControl, title) => {
    const errorTextElement = document.createElement('p')

    this.removeError(formControl)
    this.form.badForm = true
    errorTextElement.classList.add('form__error-message')
    errorTextElement.innerText = title
    formControl.classList.add('error')
    if (formControl.nextElementSibling.classList.contains('input-text__label')) {
      formControl.nextElementSibling.insertAdjacentElement('afterend', errorTextElement)
    } else {
      formControl.insertAdjacentElement('afterend', errorTextElement)
    }
  }

  removeError = (formControl) => {
    const error = formControl.parentElement.querySelector('.form__error-message')

    if (error) {
      formControl.classList.remove('error')
      if (typeof error.remove === 'function') {
        error.remove()
      } else {
        error.parentNode.removeChild(error)
      }
      this.form.badForm = false
    }
  }

  validate = () => {
    if (this.formControls.length !== 0) {
      for (const formControl of this.formControls) {
        this.checkError(formControl)

        if (formControl.tagName === 'SELECT') {
          $(formControl).on('select2:select', (e) => {
            this.removeError(formControl)
          })
        }

        formControl.addEventListener('keyup', () => {
          this.removeError(formControl)
        })

        formControl.addEventListener('blur', () => {
          this.checkError(formControl)
        })
      }
    }
  }
}
export default class Validation {
  constructor(elements) {
    this.elements = elements;
  }

  static errorCondition(element, name, condition, error) {
    if (element.name === name && condition) {
      Validation.showError(element, error);
    }
  }

  static checkError(element) {
    const passwordInput = document.querySelector('input[name=password]');
    const passwordValue = passwordInput ? passwordInput.value : false;
    const lengthCondition = element.dataset.errorLength === undefined ? false : element.value.length < Number(element.dataset.errorLength.replace(/\D+/ig, ''));
    const notEmptyCondition = element.value !== '';
    const testPattern = (element, name) => {
      if (name === 'letters') {
        return !Validation.patterns['letters'].test(element.value);
      } else if (name === 'digits') {
        return !Validation.patterns['digits'].test(element.value);
      } else {
        return !Validation.patterns[name].test(element.value);
      }
    };
    const errors = [
      {
        element: 'name',
        condition: testPattern(element, 'letters'),
        text: element.dataset.errorDefault
      },
      {
        element: 'phone',
        condition: testPattern(element, 'phone'),
        text: element.dataset.errorDefault
      },
      {
        element: 'promoCode',
        condition: notEmptyCondition && lengthCondition,
        text: element.dataset.errorLength
      },
      {
        element: 'promoCode',
        condition: notEmptyCondition && testPattern(element, 'promoCode'),
        text: element.dataset.errorDefault
      },
      {
        element: 'email',
        condition: testPattern(element, 'email'),
        text: element.dataset.errorDefault
      },
      {
        element: 'passwordRepeat',
        condition: element.value !== passwordValue,
        text: element.dataset.errorDefault
      },
      {
        element: 'discountCard',
        condition: testPattern(element, 'discountCard'),
        text: element.dataset.errorDefault
      }
    ];

    if (element.dataset.errorDefault !== undefined) {
      for (const error of errors) {
        Validation.errorCondition(element, error.element, error.condition, error.text);
      }
    }

    if (element.dataset.errorLength !== undefined && lengthCondition && element.name !== 'promoCode') {
      Validation.showError(element, element.dataset.errorLength);
    }

    if (element.dataset.errorEmpty !== undefined && element.value === '' && element.name !== 'promoCode') {
      Validation.showError(element, element.dataset.errorEmpty);
    }
  }

  static showError(element, title) {
    if (title !== false) {
      const errorTexElement = document.createElement('p');

      Validation.removeError(element);

      element.classList.add('error');

      errorTexElement.classList.add('form-error-message');
      errorTexElement.innerText = title;
      element.parentElement.insertBefore(errorTexElement, element.parentElement.children[2]);
    }
  }

  static removeError(element) {
    const error = element.parentElement.querySelector('.form-error-message');

    if (error) {
      element.classList.remove('error');
      error.remove();
    }
  }

  validate() {
    if (this.elements) {
      for (const element of this.elements) {
        Validation.checkError(element);

        element.addEventListener('keyup', function() {
          Validation.removeError(this);
        });

        element.addEventListener('blur', function() {
          Validation.checkError(this);
        });
      }
    }
  }
}

Validation.patterns = {
  digits: /^\d+$/,
  letters: /^[а-яА-ЯёЁa-zA-Z\s]+$/,
  email: /^([a-zA-Z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
  phone: /^((\+\d)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{9}$/,
  discountCard: /^\d-\d{6}-\d{6}$/,
  promoCode: /^([a-zA-Z0-9\.-]+)$/
};
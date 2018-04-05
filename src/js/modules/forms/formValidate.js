export default (inputs) => {
  let namePattern = /^[а-яА-ЯёЁa-zA-Z\s]+$/;
  let emailPattern = /^([a-zA-Z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
  let phonePattern = /^((\+\d)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{9}$/;
  let errorsLang = 'ru';
  let errorMessages = document.querySelectorAll('.c-form-error-message');
  let errors = {
    empty: {
      ru: 'Заполните поле',
      en: 'Enter the data',
    },
    name: {
      ru: 'Только буквы без цифр',
      en: 'Only letters',
    },
    nameLength: {
      ru: 'Минимальная длина 2 символа',
      en: 'Min 2 length characters',
      length: 2
    },
    email: {
      ru: 'Формат youremail@example.ru',
      en: 'Format youremail@example.ru'
    },
    phone: {
      ru: 'Формат +9 (999) 999-9999',
      en: 'Format +9 (999) 999-9999'
    },
    textLength: {
      ru: 'Минимальная длина 10 символов',
      en: 'Min length 10 characters',
      length: 10
    }
  };
  
  for (let message of errorMessages) {
    message.remove();
  }
  
  for (let input of inputs) {
    let value = input.value;
    let showError = (text) => {
      let errorTemplate = document.createElement('div');
      
      errorTemplate.classList.add('c-form-error-message');
      errorTemplate.innerHTML = `${text[errorsLang]}`;
      input.classList.add('c-error');
      input.parentNode.insertBefore(errorTemplate, input.parentNode.children[1]);
    };
    
    if (value == '') {
      showError(errors.empty);
    } else if (input.getAttribute('name') == 'name' && !namePattern.test(value)) {
      showError(errors.name);
    } else if (input.getAttribute('name') == 'name' && value.length < errors.nameLength.length) {
      showError(errors.nameLength);
    } else if (input.getAttribute('name') == 'email' && !emailPattern.test(value)) {
      showError(errors.email);
    } else if (input.getAttribute('name') == 'phone' && !phonePattern.test(value)) {
      showError(errors.phone);
    } else if (input.getAttribute('name') == 'text' && value.length < errors.textLength.length) {
      showError(errors.textLength);
    } else {
      input.classList.remove('c-error');
    }
  }
}
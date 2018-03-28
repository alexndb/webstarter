export default (inputs) => {
  let namePattern = /^[а-яА-ЯёЁa-zA-Z\s]+$/;
  let emailPattern = /^([a-zA-Z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
  let phonePattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  let errorsLang = 'ru';
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
      ru: 'Формат +7 (999) 999-9999',
      en: 'Format +7 (999) 999-9999'
    },
    textLength: {
      ru: 'Минимальная длина 10 символов',
      en: 'Min length 10 characters',
      length: 10
    }
  };
  
  $('.c-form-error-message').remove();
  
  inputs.each(function () {
    let input = $(this);
    let value = input.val();
    let showError = (text) => {
      input.addClass('c-error');
      input.after(`<div class="c-form-error-message">${text[errorsLang]}</div>`);
    };
    
    if (value == '') {
      showError(errors.empty);
    } else if (input.attr('name') == 'name' && !namePattern.test(value)) {
      showError(errors.name);
    } else if (input.attr('name') == 'name' && input.val().length < errors.nameLength.length) {
      showError(errors.nameLength);
    } else if (input.attr('name') == 'email' && !emailPattern.test(value)) {
      showError(errors.email);
    } else if (input.attr('name') == 'phone' && !phonePattern.test(value)) {
      showError(errors.phone);
    } else if (input.attr('name') == 'text' && input.val().length < errors.textLength.length) {
      showError(errors.textLength);
    } else {
      input.removeClass('c-error');
    }
  });
}
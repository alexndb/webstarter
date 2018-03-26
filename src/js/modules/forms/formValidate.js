export default (inputs) => {
  let namePattern = /^[А-Яа-яЁё\s]+$/;
  let emailPattern = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
  let phonePattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  
  $('.c-form-error-message').remove();
  
  inputs.each(function () {
    let input = $(this);
    let value = input.val();
    
    function showError(text) {
      input.addClass('c-error');
      input.after(`<div class="c-form-error-message">${text}</div>`);
    }
    
    if (value == '') {
      showError('Заполните поле');
    } else if (input.attr('name') == 'name' && !namePattern.test(value)) {
      showError('Только русские буквы без цифр');
    } else if (input.attr('name') == 'name' && input.val().length < 2) {
      showError('Минимальная длина 2 символа');
    } else if (input.attr('name') == 'email' && !emailPattern.test(value)) {
      showError('Формат youremail@example.ru');
    } else if (input.attr('name') == 'phone' && !phonePattern.test(value)) {
      showError('Формат ввода +7 (999) 999-9999');
    } else if (input.attr('name') == 'text' && input.val().length < 30) {
      showError('Минимальная длина 30 символов');
    } else {
      input.removeClass('c-error');
    }
  });
}
import formValidate from './formValidate';
import ajaxOptions from './ajax/ajaxOptions';

function formSubmit() {
  let forms = $('form');

  forms.on('submit', function (e) {
    e.preventDefault();
    let form = $(this);
    let inputs = form.find('[data-validate="true"]');

    formValidate.formValidate(inputs);

    if ($('.c-error').length == 0) {
      $.ajax(ajaxOptions.ajaxOptions(form));
    }
  });
}

export default {
  formSubmit: formSubmit
}
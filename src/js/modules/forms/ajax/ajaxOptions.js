import ajaxSuccess from './ajaxSuccess';
import ajaxError from './ajaxError';

function ajaxOptions(form) {
  return {
    type: 'POST',
    url: 'mail.php',
    data: form.serialize(),
    success: function () {
      ajaxSuccess.ajaxSuccess(form);
    },
    error: function () {
      ajaxError.ajaxError();
    }
  }
}

export default {
  ajaxOptions: ajaxOptions
}
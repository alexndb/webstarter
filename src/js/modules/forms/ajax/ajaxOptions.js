import ajaxSuccess from './ajaxSuccess';
import ajaxError from './ajaxError';

export default (form) => {
  return {
    type: 'POST',
    url: 'mail.php',
    data: form.serialize(),
    success: function () {
      ajaxSuccess(form);
    },
    error: function () {
      ajaxError();
    }
  }
}
import formValidate from './validation/formValidate';
import ajaxError from './ajax/ajaxError';
import ajaxSuccess from './ajax/ajaxSuccess';

export default () => {
  const forms = document.querySelectorAll('form');
  
  for (let form of forms) {
    form.addEventListener('submit', (e) => {
      const form = e.target;
      const validateElements = form.querySelectorAll('[data-validate="true"]');
      
      e.preventDefault();
      
      formValidate(validateElements);
      
      if (form.querySelectorAll('.c-error').length == 0) {
        fetch('mail.php', {
          method: 'POST',
          body: new FormData(form)
        })
          .then((response) => {
            return response;
          })
          .then(() => {
            ajaxSuccess(form);
          })
          .catch((err) => {
            ajaxError(err);
          });
      }
    });
  }
}
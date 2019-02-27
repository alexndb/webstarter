import onFetch from "./onFetch";
import Validation from '../../Validation';

export default () => {
  const forms = document.querySelectorAll('form');

  for (const form of forms) {
    form.addEventListener('submit', (e) => {
      const currentForm = e.target;
      const formElements = new Validation(currentForm.querySelectorAll('[data-validate="true"]'));

      e.preventDefault();

      formElements.validate();

      if (currentForm.querySelectorAll('.error').length === 0) {
        // onFetch(currentForm);
        // console.log('ok')
      } else {
        // console.log('bad')
      }
    });
  }
}
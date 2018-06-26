import checkElementExist from "../../checkElementExist";
import inputsValidate from '../validation/inputsValidate';
import textareasValidate from '../validation/textareasValidate';
import selectsValidate from '../validation/selectsValidate';
import onFetch from "./onFetch";
import removeErrors from '../validation/errors/removeErrors';

export default () => {
  const forms = document.querySelectorAll('form');
  
  for (let form of forms) {
    form.addEventListener('submit', (e) => {
      const currentForm = e.target;
      const inputs = currentForm.querySelectorAll('input[data-validate="true"]');
      const textareas = currentForm.querySelectorAll('textarea[data-validate="true"]');
      const selects = currentForm.querySelectorAll('select[data-validate="true"]');
      
      e.preventDefault();
      
      removeErrors(currentForm);
      
      inputsValidate(inputs);
      textareasValidate(textareas);
      selectsValidate(selects);
      
      if (!checkElementExist(currentForm.querySelectorAll('.c-error'))) {
        onFetch(currentForm);
      }
    });
  }
}
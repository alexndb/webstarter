import removeError from "./forms/validation/errors/removeError";
import inputValidate from "./forms/validation/inputValidate";

export default () => {
  const inputs = document.querySelectorAll('input[data-validate="true"]');
  
  for (let input of inputs) {
    input.addEventListener('blur', (e) => {
      removeError(e.target);
      inputValidate(e.target);
    });
  }
}
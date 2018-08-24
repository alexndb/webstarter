import textareaValidate from "../../js/modules/forms/validation/textareaValidate";
import removeError from "../../js/modules/forms/validation/errors/removeError";

export default () => {
  const textareas = document.querySelectorAll('textarea[data-validate="true"]');
  
  for (let textarea of textareas) {
    textarea.addEventListener('blur', (e) => {
      removeError(e.target);
      textareaValidate(e.target);
    });
  }
}
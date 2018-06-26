export default (form) => {
  let errorElements = form.querySelectorAll('.c-error');
  let errorMessages = form.querySelectorAll('.c-form-error-message');
  
  for (let message of errorMessages) {
    message.remove();
  }
  
  for (let element of errorElements) {
    element.classList.remove('c-error');
  }
}
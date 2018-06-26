export default (element, text) => {
  let errorsLang = 'ru';
  let errorTemplate = document.createElement('div');
  
  errorTemplate.classList.add('c-form-error-message');
  errorTemplate.innerHTML = `${text[errorsLang]}`;
  
  if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') {
    element.classList.add('c-error');
    element.parentElement.insertBefore(errorTemplate, element.parentElement.children[1]);
  } else if (element.tagName == 'SELECT') {
    element.nextElementSibling.children[0].children[0].classList.add('c-error');
    element.parentElement.insertBefore(errorTemplate, element.parentElement.children[2]);
  }
}
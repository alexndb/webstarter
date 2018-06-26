export default (element) => {
  if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') {
    let errorMessage = element.nextElementSibling;
    
    if (errorMessage) {
      errorMessage.remove();
    }
    
    element.classList.remove('c-error');
  } else if (element.tagName == 'SELECT') {
    let errorMessage = element.nextElementSibling.nextElementSibling;
    
    if (errorMessage) {
      errorMessage.remove();
    }
    
    element.nextElementSibling.children[0].children[0].classList.remove('c-error');
  }
}
export default () => {
  let inputsWithLabel = document.querySelectorAll('.c-input-with-label input');
  
  for (let input of inputsWithLabel) {
    let label = input.parentNode.querySelector('label');
    
    label.addEventListener('click', (e) => {
      let inputCurrent = e.target.parentNode.querySelector('input');
      
      inputCurrent.focus();
    });
    
    input.addEventListener('focus', (e) => {
      e.target.parentNode.classList.add('active');
    });
    
    input.addEventListener('blur', (e) => {
      if (e.target.value != '') {
        e.target.classList.add('active');
      } else {
        e.target.parentNode.classList.remove('active');
      }
    });
  }
}
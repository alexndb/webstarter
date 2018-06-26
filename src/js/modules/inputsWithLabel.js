export default () => {
  let inputsWithLabel = document.querySelectorAll('.c-input-with-label input');
  
  for (let input of inputsWithLabel) {
    let label = input.parentElement.querySelector('label');
    
    label.addEventListener('click', (e) => {
      let inputCurrent = e.target.parentElement.querySelector('input');
      
      inputCurrent.focus();
    });
    
    input.addEventListener('focus', (e) => {
      e.target.parentElement.classList.add('active');
    });
    
    input.addEventListener('blur', (e) => {
      if (e.target.value != '') {
        e.target.classList.add('active');
      } else {
        e.target.parentElement.classList.remove('active');
      }
    });
  }
}
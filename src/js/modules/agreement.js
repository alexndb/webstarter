export default () => {
  let allCheckbox = document.querySelectorAll('input[name=agreement]');
  
  for (let [index, checkbox] of allCheckbox.entries()) {
    let formBtn = checkbox.parentNode.parentNode.parentNode.querySelector('.c-btn');
    let checkAgreementStatus = (checkbox) => {
      if (!checkbox.checked) {
        formBtn.disabled = true;
      } else {
        formBtn.disabled = false;
      }
    };
    
    checkbox.id = `agreement${index + 1}`;
    checkbox.nextElementSibling.setAttribute('for', `agreement${index + 1}`);
    
    checkAgreementStatus(checkbox);
    
    checkbox.addEventListener('change', (e) => {
      let currentCheckbox = e.target;
      
      checkAgreementStatus(currentCheckbox);
    });
  }
}
export default () => {
  let allCheckboxAgreement = document.querySelectorAll('input[name=agreement]');

  for (let checkbox of allCheckboxAgreement) {
    let formBtn = checkbox.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.button');

    let checkAgreementStatus = (checkbox) => {
      formBtn.disabled = !checkbox.checked;
    };

    checkAgreementStatus(checkbox);

    checkbox.addEventListener('change', function() {
      checkAgreementStatus(this);
    });
  }
}
export default () => {
  const allCheckboxAgreement = document.querySelectorAll('input[name=agreement]')

  for (const checkbox of allCheckboxAgreement) {
    const formBtn = checkbox.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.button')

    const checkAgreementStatus = (currentCheckbox) => {
      if (formBtn) {
        formBtn.disabled = !currentCheckbox.checked
      }
    }

    checkAgreementStatus(checkbox)

    checkbox.addEventListener('change', (e) => {
      checkAgreementStatus(e.target)
    })
  }
}
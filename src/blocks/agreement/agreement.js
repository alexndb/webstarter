export default (() => {
  const allCheckboxesAgreement = document.querySelectorAll('input[name=agreement]')

  if (allCheckboxesAgreement) {
    for (const checkbox of allCheckboxesAgreement) {
      const formBtn = checkbox.closest('form').querySelector('[type=submit]')

      if (formBtn) {
        const checkAgreementStatus = currentCheckbox => {
          formBtn.disabled = !currentCheckbox.checked
        }

        checkAgreementStatus(checkbox)

        checkbox.addEventListener('change', e => {
          checkAgreementStatus(e.target)
        })
      }
    }
  }
})()
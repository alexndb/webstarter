import popupOpen from '../../../libs/magnificPopup/popupOpen';
import goToStep from '../goToStep'

export default (form) => {
  form = $(form);
  let currentStep = 1;
  const btnPrev = form.find('.js-form-step-nav a');
  const btnNext = form.find('.js-form-step-nav button');
  
  btnPrev.on('click', function (e) {
    e.preventDefault();
    
    currentStep--;
    
    if (currentStep == 2) {
      popupOpen('#popup-default');
    } else {
      goToStep(form, currentStep);
    }
  });
  
  btnNext.on('click', function () {
    currentStep++;
    
    if (currentStep == 3) {
      popupOpen('#popup-default');
      currentStep--;
    } else {
      goToStep(form, currentStep);
    }
  });
}
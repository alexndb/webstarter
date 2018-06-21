import goToStep from '../goToStep'

export default (form) => {
  form = $(form);
  let currentStep = 1;
  const btnPrev = form.find('.js-form-step-nav a');
  const btnNext = form.find('.js-form-step-nav button');
  
  btnPrev.on('click', function (e) {
    e.preventDefault();
    
    currentStep--;
    goToStep(form, currentStep);
  });
  
  btnNext.on('click', function () {
    currentStep++;
    // currentStep = 2; - переход на указанный шаг
    goToStep(form, currentStep);
  });
}
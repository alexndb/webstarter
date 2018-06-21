export default (form, step, callback) => {
  const steps = form.find('.js-form-step');
  const btnPrev = form.find('.js-form-step-nav a');
  const btnNext = form.find('.js-form-step-nav button');
  
  if (callback) {
    callback();
  } else {
    // if (step + 1 > steps.length) {
    //   btnNext.hide();
    // } else {
    //   btnNext.show();
    // }
    // if (step - 1 < 0) {
    //   btnPrev.hide();
    // } else {
    //   btnPrev.show();
    // }
    steps.not(steps.eq(step - 1)).addClass('js-form-step-hidden').hide();
    steps.eq(step - 1).removeClass('js-form-step-hidden').stop(true, true).fadeIn(300);
  }
}
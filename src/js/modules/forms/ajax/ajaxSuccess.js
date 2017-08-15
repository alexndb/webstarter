import formSubmitThanks from '../formSubmitThanks'
import afterAjaxSuccess from './afterAjaxSuccess'

function ajaxSuccess(form) {
  formSubmitThanks.formSubmitThanks(form);
  afterAjaxSuccess.afterAjaxSuccess(form, 6000);
}

export default {
  ajaxSuccess: ajaxSuccess
}
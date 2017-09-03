import formSubmitThanks from '../formSubmitThanks'
import afterAjaxSuccess from './afterAjaxSuccess'

export default function ajaxSuccess(form) {
  formSubmitThanks(form);
  afterAjaxSuccess(form, 6000);
}
import formSubmitThanks from '../formSubmitThanks'
import afterAjaxSuccess from './afterAjaxSuccess'

export default (form) => {
  formSubmitThanks(form);
  afterAjaxSuccess(form, 6000);
}
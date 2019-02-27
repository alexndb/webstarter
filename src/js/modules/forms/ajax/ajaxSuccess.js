import formSubmitSuccess from '../formSubmitSuccess';
import afterAjaxSuccess from './afterAjaxSuccess';

export default (form) => {
  formSubmitSuccess(form);
  afterAjaxSuccess(form, 5000);
}
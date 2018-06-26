import phonePattern from "./patterns/phone";
import errors from "./errors/errorsList";
import showError from "./errors/showError";
import namePattern from "./patterns/name";
import emailPattern from "./patterns/email";

export default (element) => {
  if (element.value == '') {
    showError(element, errors.empty);
  } else if (element.getAttribute('name') == 'name' && !namePattern.test(element.value)) {
    showError(element, errors.name);
  } else if (element.getAttribute('name') == 'name' && element.value.length < errors.nameLength.length) {
    showError(element, errors.nameLength);
  } else if (element.getAttribute('name') == 'email' && !emailPattern.test(element.value)) {
    showError(element, errors.email);
  } else if (element.getAttribute('name') == 'phone' && !phonePattern.test(element.value)) {
    showError(element, errors.phone);
  } else if (element.getAttribute('name') == 'text' && element.value.length < errors.textLength.length) {
    showError(element, errors.textLength);
  }
}
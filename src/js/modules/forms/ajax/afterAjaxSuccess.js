import $ from 'jquery';

export default (form, timeOut) => {
  setTimeout(() => {
    form.reset();
    $.magnificPopup.close();
  }, timeOut);
}
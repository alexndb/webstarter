export default (form, timeOut) => {
  setTimeout(() => {
    form.trigger('reset');
    $.magnificPopup.close();
  }, timeOut);
}
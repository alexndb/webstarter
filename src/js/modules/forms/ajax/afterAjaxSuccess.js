export default (form, timeOut) => {
  setTimeout(() => {
    form.reset();
    $.magnificPopup.close();
  }, timeOut);
}
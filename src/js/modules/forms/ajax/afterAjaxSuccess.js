function afterAjaxSuccess(form, timeOut) {
  setTimeout(function () {
    form.trigger('reset');
    $.magnificPopup.close();
  }, timeOut);
}

export default {
  afterAjaxSuccess: afterAjaxSuccess
}
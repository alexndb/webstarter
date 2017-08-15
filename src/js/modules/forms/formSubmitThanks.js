function formSubmitThanks(form) {
  let thanksName = form.find($('input[name=name]')).val();
  let thanksPhoneNumber = form.find($('input[type=tel]')).val();

  $.magnificPopup.close();
  $.magnificPopup.open({
    items: {
      src: '<div class="c-popup-default c-popup-thankyou" id="popup-thanks">' +
      '<div class="c-popup-default-inner">' +
      '<h2 class="c-popup-default-title">Спасибо за заявку ' + thanksName + '!</h2>' +
      '<p>Мы перезвоним вам в ближайшее время по номеру ' + '<span>' + thanksPhoneNumber + '</span>' + '</p>' +
      '</div>' +
      '</div>'
    },
    type: 'inline',
    showCloseBtn: false
  });
}

export default {
  formSubmitThanks: formSubmitThanks
}
import dragOff from './modules/dragOff';
import formSubmit from './modules/forms/formSubmit';
import magnificPopup from './modules/magnificPopup';
import phoneMask from './modules/phoneMask';
import select2 from './modules/select2';

dragOff();

$(document).ready(() => {
  formSubmit();
  magnificPopup();
  phoneMask();
  select2();
});
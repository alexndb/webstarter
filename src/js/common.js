import dragOff from './modules/dragOff';
import iMask from './modules/iMask';
import formSubmit from './modules/forms/formSubmit';
import slider1 from './modules/swiper/slider1';
import magnificPopup from './modules/magnificPopup';
import select2 from './modules/select2';

dragOff();
iMask();
formSubmit();
slider1();

$(document).ready(() => {
  magnificPopup();
  select2();
});
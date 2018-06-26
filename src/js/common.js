import "babel-polyfill";

import dragOff from './modules/dragOff';
import iMask from './modules/libs/iMask';
import formSubmit from './modules/forms/submit/onSubmit';
import magnificPopup from './modules/libs/magnificPopup/popups';
import select2 from './modules/libs/select2';
import agreement from './modules/agreement';
import mobileNav from './modules/mobileNav';
import inputs from './modules/inputs';
import textareas from './modules/textareas';

dragOff();
iMask();
formSubmit();
agreement();
inputs();
textareas();

$(document).ready(() => {
  magnificPopup();
  select2();
  mobileNav();
});
import "babel-polyfill";

import dragOff from './modules/dragOff';
import iMask from './modules/libs/iMask';
import formSubmit from './modules/forms/formSubmit';
import magnificPopup from './modules/libs/magnificPopup/popups';
import select2 from './modules/libs/select2';
import agreement from './modules/agreement';
import mobileNav from './modules/mobileNav';

dragOff();
iMask();
formSubmit();
agreement();

$(document).ready(() => {
  magnificPopup();
  select2();
  mobileNav();
});
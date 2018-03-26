import dragOff from './modules/dragOff';
import formSubmit from './modules/forms/formSubmit';
import magnificPopup from './modules/magnificPopup';
import phoneMask from './modules/phoneMask';
import select2 from './modules/select2';
import resolutionEvents from './modules/resolutionEvents';
import resizeEvents from './modules/resizeEvents';

$(document).ready(() => {
  dragOff();
  formSubmit();
  magnificPopup();
  phoneMask();
  select2();
  resolutionEvents();
  resizeEvents();
});
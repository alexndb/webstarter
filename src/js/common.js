// import "babel-polyfill";
import $ from 'jquery';

import dragOff from './modules/dragOff';
import iMask from './modules/libs/iMask';
import formSubmit from './modules/forms/submit/onSubmit';
import magnificPopup from './modules/libs/magnificPopup/popups';
import select from '../blocks/select/select';
import agreement from '../blocks/agreement/agreement';
import buttonToggle from '../blocks/button/button-toggle';
import input from '../blocks/input/input';
import textareas from '../blocks/textarea/textarea';
import sliders from './modules/libs/slickSlider/sliders/sliders';

dragOff();
iMask();
formSubmit(); 
agreement();
input();
textareas();

$(document).ready(() => {
  magnificPopup();
  select();
  buttonToggle();
  sliders();
});
import popups from './modules/magnificPopup'; // popups
import phoneMask from './modules/phoneMask'; // phone mask
import imagesAndLinksDragOff from './modules/imagesAndLinksDragOff'; // images and links drag off
import formSubmit from './modules/forms/formSubmit'; // form submit
import inputs from './modules/inputs'; // inputs
import selects from './modules/selects'; // selects
import resolutionEvents from './modules/resolutionEvents'; // resolution events
import resizeEvents from './modules/resizeEvents'; // resize events

$(document).ready(function () {
    popups.popups();
    phoneMask.phoneMask();
    imagesAndLinksDragOff.imagesAndLinksDragOff();
    formSubmit.formSubmit();
    inputs.inputs();
    selects.selects();
    resolutionEvents.resolutionEvents();
    resizeEvents.resizeEvents();
});
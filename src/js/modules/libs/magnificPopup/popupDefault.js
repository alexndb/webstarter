import $ from 'jquery';
import 'magnific-popup';
import popupDefaultOptions from './options/popupDefaultOptions';
import popupOpen from './popupOpen';

export default () => {
  const popups = $('.js-popup');

  if (popups.length) {
    popups.magnificPopup(popupDefaultOptions);

    $('body').on('click', '.header.sticky .js-popup', function() {
      popupOpen($(this).attr('href'));
    });
  }
}
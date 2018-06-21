import popupDefaultOptions from './options/popupDefaultOptions';
import popupOpen from './popupOpen';

export default () => {
  $('.js-popup').magnificPopup(popupDefaultOptions);
  
  $('body').on('click', '.c-header.sticky .js-popup', function () {
    popupOpen($(this).attr('href'));
  });
}
import popupGalleryOptions from './options/popupGalleryOptions';

export default () => {
  $('.js-popup-gallery').each(function () {
    $(this).magnificPopup(popupGalleryOptions($(this)));
  });
}
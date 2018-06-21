import popupDefaultOptions from './options/popupDefaultOptions';

export default () => {
  $('.js-popup-iframe').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      
      $.magnificPopup.open(
        Object.assign(
          popupDefaultOptions,
          {
            type: 'iframe',
            items: {
              src: $(this).attr('href')
            }
          }
        )
      );
    });
  });
}
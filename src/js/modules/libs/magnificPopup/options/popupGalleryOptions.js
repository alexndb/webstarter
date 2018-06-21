export default (currentGallery) => {
  return {
    delegate: currentGallery.find('.js-popup-gallery-images a'),
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile mfp-fade',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
      tCounter: '<span class="mfp-counter">%curr% / %total%</span>'
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function (item) {
        return item.el.attr('title');
      }
    },
  };
}
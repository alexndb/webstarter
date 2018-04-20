export default () => {
  let elements = [
    '.c-block-type3-bottom-item-title',
    '.c-block-type3-bottom-item-text',
    '.c-block-type5-item-title',
    '.c-block-type5-item-text',
    '.c-block-type7-top-slider-slide-title',
    '.c-block-type7-bottom-slider-slide-title',
    '.c-block-type7-bottom-slider-slide-descr',
    '.c-block-type7-bottom-slider-slide-text',
    '.c-block-type9-item-title',
    '.c-block-type9-item-text'
  ];
  let matchHeight = (el) => {
    el.matchHeight({
      byRow: true,
      property: 'min-height'
    });
  };
  
  $.each(elements, function () {
    matchHeight($(this));
  })
}
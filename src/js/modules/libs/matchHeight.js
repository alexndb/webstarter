export default () => {
  let elements = [
    '.c-block-type1-item-title'
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
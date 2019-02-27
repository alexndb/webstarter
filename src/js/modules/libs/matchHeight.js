export default () => {
  const elements = [
    '.item-title'
  ];
  const matchHeight = (el) => {
    el.matchHeight({
      byRow: true,
      property: 'min-height'
    });
  };

  $.each(elements, function() {
    matchHeight($(this));
  })
}
export default (slider) => {
  if (slider.hasClass('slick-initialized')) {
    slider.slick('unslick');
  }
}
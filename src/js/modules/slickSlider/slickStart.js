export default (slider, sliderOptions) => {
  if (!slider.hasClass('slick-initialized')) {
    slider.slick(sliderOptions);
  }
}
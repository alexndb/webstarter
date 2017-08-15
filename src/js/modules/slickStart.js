function sliderStart(slider, sliderOptions) {
  if (!slider.hasClass('slick-initialized')) {
    slider.slick(sliderOptions);
  }
}

export default {
  sliderStart: sliderStart
}
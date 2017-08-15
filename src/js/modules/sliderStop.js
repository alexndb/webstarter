function sliderStop(slider) {
  if (slider.hasClass('slick-initialized')) {
    slider.slick('unslick');
  }
}

export default {
  sliderStop: sliderStop
}
export default function sliderStart(slider, sliderOptions) {
  if (!slider.hasClass('slick-initialized')) {
    slider.slick(sliderOptions);
  }
}
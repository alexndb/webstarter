export let sliderStart = (slider, sliderOptions) => {
  if (!slider.hasClass('slick-initialized')) {
    slider.slick(sliderOptions);
  }
};

export let sliderStop = (slider) => {
  if (slider.hasClass('slick-initialized')) {
    slider.slick('unslick');
  }
};
import {sliderStart, sliderStop} from './sliderEvents';

export let checkMinWidth = (width, slider, sliderOptions) => {
  if (window.innerWidth < width) {
    sliderStart(slider, sliderOptions);
  } else {
    sliderStop(slider);
  }
};

export let checkMaxWidth = (width, slider, sliderOptions) => {
  if (window.innerWidth > width) {
    sliderStart(slider, sliderOptions);
  } else {
    sliderStop(slider);
  }
};
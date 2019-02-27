import $ from 'jquery';
import 'slick-carousel/slick/slick';
import {checkMinWidth, checkMaxWidth} from '../checkWidth';

export default () => {
  let slider = $('.js-slider2');
  let sliderOptions = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true
  };

  checkMinWidth(768, slider, sliderOptions);

  $(window).on('resize', function() {
    checkMinWidth(768, slider, sliderOptions);
  });
}
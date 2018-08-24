import $ from 'jquery';
import 'slick-carousel/slick/slick';

export default () => {
  let slider = $('.js-slider1');
  let sliderOptions = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  
  slider.slick(sliderOptions);
}
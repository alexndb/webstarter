import Slider from './Slider';

export default function () {
  let slider2 = new Slider('.js-slider1', {
    loop: true,
    spaceBetween: 15,
    slidesPerView: 3,
    breakpoints: {
      992: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 1
      }
    }
  });
}
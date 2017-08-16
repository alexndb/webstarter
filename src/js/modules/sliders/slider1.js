function slider1() {
  let slider1 = $('.js-slider1');
  let slider1Options = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  slider1.slick(slider1Options);
}

export default {
  slider1: slider1
}
import Swiper from 'swiper/dist/js/swiper'

export default () => {
  const sliders = document.querySelectorAll('.js-slider1')

  if (sliders) {
    for (let slider of sliders) {
      const sliderOptions = {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
          nextEl: slider.querySelector('.swiper-button-next'),
          prevEl: slider.querySelector('.swiper-button-prev')
        },
        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true
        }
      }

      new Swiper(slider, sliderOptions)
    }
  }
}
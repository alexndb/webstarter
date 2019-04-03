import Slider from '../Slider'

export default () => {
  const sliders = document.querySelectorAll('.js-slider2')

  if (sliders) {
    const sliderCustomOptions = {
      activeOn: 'mobile',
      width: 768
    }

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

      slider = new Slider(slider, sliderOptions, sliderCustomOptions)

      slider.checkWidth()

      window.addEventListener('resize', function() {
        slider.checkWidth()
      })
    }
  }
}
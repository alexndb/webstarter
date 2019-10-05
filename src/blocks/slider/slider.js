import Swiper from 'swiper/js/swiper'

class Slider extends Swiper {
  constructor(sliderElement, sliderOptions) {
    super(sliderElement, sliderOptions)
    sliderOptions.checkState = sliderOptions.checkState || null
    this.instance = this

    if (sliderOptions.checkState) {
      this.checkWidth(sliderOptions)
      window.addEventListener('resize', () => {
        this.checkWidth(sliderOptions)
      })
    }
  }

  checkWidth(sliderOptions) {
    const condition = sliderOptions.checkState.activeOn === 'mobile' ? window.innerWidth < sliderOptions.checkState.activeOnWidth : window.innerWidth > sliderOptions.checkState.activeOnWidth

    if (condition) {
      if (!this.instance) {
        this.instance = new Swiper(this.$el[0], sliderOptions)
      }
    } else if (this.instance) {
      this.instance.destroy(false, true)
      this.instance = null
    }
  }
}

export default () => {
  const drawNav = (slider) => ({
    navigation: {
      nextEl: slider.querySelector('.swiper-button-next'),
      prevEl: slider.querySelector('.swiper-button-prev')
    },
    pagination: {
      el: slider.querySelector('.swiper-pagination'),
      clickable: true
    }
  })
  const slider1Options = (slider) => ({
    slidesPerView: 3,
    spaceBetween: 20,
    checkState: {
      activeOn: 'mobile',
      activeOnWidth: 768
    },
    ...drawNav(slider)
  })

  const createSlider = (selector, options) => {
    const sliders = document.querySelectorAll(selector)

    if (sliders.length) {
      for (const slider of sliders) {
        new Slider(slider, options(slider))
      }
    }
  }

  createSlider('.js-slider1', slider1Options)
}
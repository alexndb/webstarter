import Swiper, {Navigation, Pagination} from 'swiper'

export default (() => {
  const setNav = (slider) => ({
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: slider.querySelector('.swiper-button-next'),
      prevEl: slider.querySelector('.swiper-button-prev')
    },
    pagination: {
      el: slider.querySelector('.swiper-pagination'),
      clickable: true
    }
  })

  const createSlider = (selector, options) => {
    const sliders = document.querySelectorAll(selector)

    if (sliders.length) {
      for (const slider of sliders) {
        const sliderOptions = options(slider)
        const {responsiveMethod, breakpoints} = sliderOptions
        const destroyResolution = (() => {
          let val

          for (const [key, value] of Object.entries(breakpoints)) {
            if (value.destroy) val = key
          }
          return Number(val)
        })()

        if (destroyResolution) {
          let sliderInstance
          const detectActive = () => {
            const swiperIsInitialized = slider.classList.contains('swiper-initialized')

            if (responsiveMethod === 'from-min-to-max') {
              if (window.innerWidth <= destroyResolution && !swiperIsInitialized) {
                sliderInstance = new Swiper(slider, sliderOptions)
              }
              if (window.innerWidth > destroyResolution && swiperIsInitialized) {
                sliderInstance.destroy()
              }
            }
            if (responsiveMethod === 'from-max-to-min') {
              if (window.innerWidth >= destroyResolution && !swiperIsInitialized) {
                sliderInstance = new Swiper(slider, sliderOptions)
              }
              if (window.innerWidth < destroyResolution && swiperIsInitialized) {
                sliderInstance.destroy()
              }
            }
          }
          detectActive()
          window.addEventListener('resize', detectActive)
        } else {
          new Swiper(slider, options(slider))
        }
      }
    }
  }

  const slider1Options = (slider) => ({
    slidesPerView: 3,
    spaceBetween: 20,
    responsiveMethod: 'from-min-to-max', // from-max-to-min
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      640: {
        // destroy: true
      }
    },
    ...setNav(slider)
  })

  createSlider('.js-slider1', slider1Options)
})()
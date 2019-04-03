import Swiper from 'swiper/dist/js/swiper'

export default class Slider extends Swiper {
  constructor(sliderElement, sliderOptions, sliderCustomOptions) {
    super(sliderElement, sliderOptions)
    this.sliderElement = sliderElement
    this.sliderOptions = sliderOptions
    this.sliderCustomOptions = sliderCustomOptions
    this.instance = this
  }

  checkWidth() {
    const condition = this.sliderCustomOptions.activeOn === 'mobile' ? window.innerWidth < this.sliderCustomOptions.width : window.innerWidth > this.sliderCustomOptions.width

    if (condition) {
      if (!this.instance) {
        this.instance = new Swiper(this.sliderElement, this.sliderOptions)
      }
    } else {
      if (this.instance) {
        this.instance.destroy(false, true)
        this.instance = null
      }
    }
  }
}
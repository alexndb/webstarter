export default class Slider {
  constructor(selector, options) {
    let th = this;
    th.instance;
    th.navElements = ['swiper-button-prev', 'swiper-button-next', 'swiper-pagination'];
    th.sliderElement = document.querySelector(selector);
    th.enableBreakPoint = 992;
    
    th.createNavElement = (className) => {
      let element = document.createElement('div');
      th.sliderElement.appendChild(element);
      element.classList.add(className);
    };
    
    th.addNav = () => {
      th.navElements.forEach((navElementClassName) => {
        th.createNavElement(navElementClassName);
      });
    };
    
    th.deleteNav = () => {
      th.navElements.forEach((navElement) => {
        document.querySelector(`.${navElement}`).remove();
      });
    };
    
    th.checkSliderInitialize = () => {
      return th.sliderElement.classList.contains('swiper-initialized');
    };
    
    th.addSliderInitializedStatus = () => {
      th.sliderElement.classList.remove('swiper-destroyed');
      th.sliderElement.classList.add('swiper-initialized');
    };
    
    th.addSliderDestroyedStatus = () => {
      th.sliderElement.classList.remove('swiper-initialized');
      th.sliderElement.classList.add('swiper-destroyed');
    };
    
    th.start = () => {
      if (!th.checkSliderInitialize()) {
        th.instance = new Swiper(selector, th.options);
      }
    };
    
    th.stop = () => {
      if (th.checkSliderInitialize()) {
        th.instance.destroy();
      }
    };
    
    th.checkWidth = () => {
      let ww = window.innerWidth;
      
      if (ww >= th.enableBreakPoint) {
        th.stop();
      }
      else {
        th.start();
      }
    };
    
    th.options = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        init: function () {
          th.addNav();
          th.addSliderInitializedStatus();
        },
        beforeDestroy: function () {
          th.deleteNav();
          th.addSliderDestroyedStatus();
        }
      }
    };
    
    th.instance = new Swiper(selector, Object.assign(th.options, options));
    
    th.checkWidth();
    
    window.addEventListener('resize', () => {
      th.checkWidth();
    });
  }
}
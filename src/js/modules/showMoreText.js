export default () => {
  let btns = document.querySelectorAll('.js-showMoreText');
  
  for (let btn of btns) {
    let parent = btn.parentNode;
    let textOriginalSelector = parent.querySelector('.c-block-type7-bottom-slider-slide-text');
    let textOriginal = textOriginalSelector.innerText;
    let textSliced = textOriginal.slice(0, 207) + '..';
    
    textOriginalSelector.innerText = textSliced;
    
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      switch (e.target.innerText) {
        case 'Читать весь отзыв':
          e.target.innerText = 'Свернуть отзыв';
          textOriginalSelector.innerText = textOriginal;
          break;
        case 'Свернуть отзыв':
          e.target.innerText = 'Читать весь отзыв';
          textOriginalSelector.innerText = textSliced;
          break;
      }
      $.fn.matchHeight._update();
    });
  }
}
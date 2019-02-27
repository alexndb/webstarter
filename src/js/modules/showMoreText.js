export default () => {
  const btns = document.querySelectorAll('.js-showMoreText');
  
  for (const btn of btns) {
    const parent = btn.parentElement;
    const textOriginalSelector = parent.querySelector('.c-block-type7-bottom-slider-slide-text');
    const textOriginal = textOriginalSelector.innerText;
    const textSliced = textOriginal.slice(0, 207) + '..';
    
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
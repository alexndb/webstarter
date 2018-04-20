export default () => {
  if (document.querySelectorAll('.js-GetMoreNews').length == 1) {
    document.querySelector('.js-GetMoreNews').addEventListener('click', () => {
      for (let i = 1; i < 9; i++) {
        let el = document.querySelectorAll('.c-block-type9-item')[0].cloneNode(true);
        document.querySelector('.c-block-type9-items').appendChild(el);
      }
    });
  }
}
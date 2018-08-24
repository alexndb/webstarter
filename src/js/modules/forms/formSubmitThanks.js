export default () => {
  $.magnificPopup.open({
    items: {
      src: `
        <div class="c-popup c-popup-thanks" id="popup-thanks">
          <div class="c-popup-inner">
            <h2 class="c-popup-title">Спасибо за заявку!</h2>
            <p>Наш менеджер свяжется с вами в ближайшее время</p>
          </div>
        </div>`
    },
    type: 'inline',
    showCloseBtn: false
  });
}
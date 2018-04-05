export default () => {
  $.magnificPopup.open({
    items: {
      src: `
        <div class="c-popup-default c-popup-thanks" id="popup-thanks">
          <div class="c-popup-default-inner">
            <h2 class="c-popup-default-title">Спасибо за заявку!</h2>
            <p>Наш менеджер свяжется с вами в ближайшее время</p>
          </div>
        </div>`
    },
    type: 'inline',
    showCloseBtn: false
  });
}
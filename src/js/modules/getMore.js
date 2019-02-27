export default () => {
  const getMoreButtons = document.querySelectorAll('.js-getMore');

  if (getMoreButtons.length !== 0) {
    for (const btn of getMoreButtons) {

      btn.addEventListener('click', function () {
        const itemsContainer = this.parentElement.previousElementSibling;
        const items = itemsContainer.querySelectorAll('a, li, div');

        for (const [index, item] of items.entries()) {
          if (index < 14) {
            itemsContainer.appendChild(item.cloneNode(true));
          }
        }
      });
    }
  }
}
import tippy from 'tippy.js/dist/tippy.all';

export default () => {
  let tooltips = document.querySelectorAll('.tooltip');

  if (tooltips) {
    for (let tooltip of tooltips) {
      tippy(tooltip, {
        maxWidth: '250px',
        arrow: true,
        placement: 'bottom',
        content: document.querySelector(tooltip.dataset.id)
      });
    }
  }
}
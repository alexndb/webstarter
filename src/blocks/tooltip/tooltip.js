import tippy from 'tippy.js'

export default () => {
  const tooltips = document.querySelectorAll('.tooltip')

  if (tooltips) {
    for (const tooltip of tooltips) {
      tippy(tooltip, {
        maxWidth: '250px',
        arrow: true,
        placement: 'bottom',
        content: tooltip.children[1].innerHTML
      })
    }
  }
}
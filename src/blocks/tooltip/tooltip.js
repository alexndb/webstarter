import tippy from 'tippy.js'

export default (() => {
  const tooltips = document.querySelectorAll('.tooltip')

  if (tooltips) {
    for (const tooltip of tooltips) {
      tippy(tooltip, {
        appendTo: 'parent',
        // trigger: 'click',
        // hideOnClick: false,
        // animation: 'perspective',
        // maxWidth: '250px',
        arrow: false,
        placement: 'bottom-start',
        allowHTML: true,
        content: tooltip.children[1].innerHTML
        // interactive: true,
        // onShow(instance) {
        //   instance.popper.querySelector('.tooltip-close').addEventListener('click', () => {
        //     instance.hide()
        //   })
        // },
        // onHide(instance) {
        //   instance.popper.querySelector('.tooltip-close').removeEventListener('click', () => {
        //     instance.hide()
        //   })
        // }
      })
    }
  }
})()
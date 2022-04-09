export default (() => {
  const selectors = ['img']

  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector)

    if (elements) {
      elements.forEach(element => {
        element.addEventListener('dragstart', e => e.preventDefault())
      })
    }
  })
})()
export default (() => {
  const selectors = ['img']

  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector)

    if (elements) {
      for (const element of elements) {
        element.addEventListener('dragstart', e => e.preventDefault())
      }
    }
  })
})()
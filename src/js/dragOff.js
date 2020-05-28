export default (() => {
  const selectors = ['img']

  for (const selector of selectors) {
    for (const element of document.querySelectorAll(selector)) {
      element.addEventListener('dragstart', e => e.preventDefault())
    }
  }
})()
import Choices from 'choices.js'

export default () => {
  const selects = document.querySelectorAll('select')

  if (selects.length) {
    new Choices('select', {
      searchEnabled: false
    })
  }
}
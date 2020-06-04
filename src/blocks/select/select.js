import Choices from 'choices.js'

export default (() => {
  const selects = document.querySelectorAll('select')

  if (selects.length) {
    for (const select of selects) {
      new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false
      })

      select.addEventListener('choice', (e) => {
        if (e.detail.choice.placeholder) {
          e.target.classList.remove('is-selected')
        } else {
          e.target.classList.add('is-selected')
        }
      })
    }
  }
})()
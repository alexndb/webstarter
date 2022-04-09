/* eslint-disable no-plusplus, no-shadow */
export default (() => {
  const inputs = document.querySelectorAll('input[type=file]')
  const textPlaceholder = 'Click or drop files here'

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    const wrapper = document.createElement('div')
    const template = `<div class="input-file__drop">${textPlaceholder}</div><div class="input-file__preview"></div>`

    wrapper.classList.add('input-file')
    input.insertAdjacentElement('beforebegin', wrapper)
    wrapper.insertAdjacentElement('afterbegin', input)
    wrapper.insertAdjacentHTML('beforeend', template)

    const dropZone = wrapper.querySelector('.input-file__drop')
    const previewItemsContainer = wrapper.querySelector('.input-file__preview')

    const onClick = () => {
      input.click()
    }

    const onFormClear = () => {
      previewItemsContainer.innerHTML = ''
      dropZone.textContent = textPlaceholder
    }

    input.clear = onFormClear

    const makeStrShort = (str) => {
      const newStrLength = 8
      let newStr = ''

      if (str.length > newStrLength) {
        for (let i = 0; i < str.length; i++) {
          if (i < newStrLength) {
            newStr += str[i]
          }
        }
        newStr = `${newStr}..`
      }
      return newStr !== '' ? newStr : str
    }

    const handleFiles = (files) => {
      let allSize = 0

      previewItemsContainer.innerHTML = ''

      if (files.length === 0) {
        dropZone.textContent = textPlaceholder
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const previewItem = previewItemsContainer.appendChild(document.createElement('div'))

          previewItem.classList.add('input-file__preview-item')
          allSize += file.size

          if (file.type.startsWith('image/')) {
            const reader = new FileReader()

            reader.onload = (e) => {
              previewItem.style.backgroundImage = `url(${e.target.result})`
            }

            reader.readAsDataURL(file)
          }

          previewItem.innerHTML = `
          <div>
            <div>${makeStrShort(file.name)}</div>
            <div>${file.name.match(/\.([^.]*?)(?=\?|#|$)/)[1]}</div>
            <div>${(file.size / 1024 / 1024).toFixed(2)}mb</div>
          </div>
        `
        }

        dropZone.textContent = `${files.length} ${files.length > 1 ? 'files' : 'file'}, ${(allSize / 1024 / 1024).toFixed(2)}mb`
      }
    }

    wrapper.addEventListener('click', onClick)

    const cancelEvent = (e) => {
      e.stopPropagation()
      e.preventDefault()
    }

    const onDragenter = (e) => {
      cancelEvent(e)
      dropZone.classList.add('drop-active')
    }

    const onDragover = (e) => {
      cancelEvent(e)
    }

    const onDrop = (e) => {
      cancelEvent(e)
      dropZone.classList.remove('drop-active')
      handleFiles(e.dataTransfer.files)
    }

    dropZone.addEventListener('dragenter', (e) => {
      onDragenter(e)
    })
    dropZone.addEventListener('dragover', (e) => {
      onDragover(e)
    })
    dropZone.addEventListener('drop', (e) => {
      onDrop(e)
    })

    input.addEventListener('change', (e) => {
      handleFiles(e.target.files)
    })
  }
})()
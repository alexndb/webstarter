import fs from 'node:fs'

const config = {
  blocksDir: './src/blocks',
  extensions: [
    'pug',
    'sass'
  ]
}

const wsLog = msg => {
  console.log(`[WS] ${msg}`) // eslint-disable-line no-console
}

const createFile = (name, extension, content) => {
  fs.writeFile(`${config.blocksDir}/${name}/${name}.${extension}`, content, err => {
    if (err) {
      throw err
    } else {
      wsLog(`"${name}/${name}.${extension}" успешно создан`)
    }
  })
}

const createBlock = (blockName) => {
  if (blockName === undefined) {
    wsLog('Укажите название блока')
  } else {
    const extensions = [
      ...config.extensions,
      ...process.argv.slice(3)
    ]

    fs.mkdir(`${config.blocksDir}/${blockName}`, errBlockDir => {
      if (errBlockDir) {
        wsLog('Такой блок уже существует')
      } else {
        wsLog(`Создаю блок "${blockName}"`)
        for (const extension of extensions) {
          let blockContent

          if (extension === 'pug') {
            blockContent = `mixin ${blockName}\n  .${blockName} ${blockName}`
            createFile(blockName, extension, blockContent)
          } else if (extension === 'sass') {
            blockContent = `.${blockName}\n  `
            createFile(blockName, extension, blockContent)
          } else if (extension === 'js') {
            blockContent = `export default () => {\n  const element = document.querySelector('.${blockName}')\n\n  element.addEventListener('click', () => {\n    console.log('click on ${blockName}') // eslint-disable-line no-console\n  })\n}`
            createFile(blockName, extension, blockContent)
          } else if (extension === 'img') {
            fs.mkdir(`${config.blocksDir}/${blockName}/${extension}`, errImgDir => {
              if (errImgDir) {
                wsLog('Такая папка уже существует')
              } else {
                wsLog(`"${blockName}/${extension}/" успешно создан`)
              }
            })
          }
        }
      }
    })
  }
}

createBlock(process.argv[2])
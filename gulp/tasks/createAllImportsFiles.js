import fs from 'fs'
import {SRC_DIR, BLOCKS_DIR} from '../path'

export default function createAllImportsFiles(cb) {
  const allBlocks = fs.readdirSync(BLOCKS_DIR)
  const options = [
    {
      extName: 'pug',
      content: '',
      createContentLine: (block) => `include ../blocks/${block}/${block}`
    },
    {
      extName: 'sass',
      content: '',
      createContentLine: (block, ext) => `@import '../blocks/${block}/${block}'`
    },
    {
      extName: 'js',
      content: ''
    }
  ]

  const jsContent = {
    imports: '',
    calls: '\nexport default () => {\n'
  }

  allBlocks.forEach((block, index) => {
    options.forEach(option => {
      const currentBlockFilesList = fs.readdirSync(`${BLOCKS_DIR}/${block}`)

      if (currentBlockFilesList.includes(`${block}.${option.extName}`)) {
        if (option.extName !== 'js') {
          if (index === allBlocks.length - 1) {
            option.content += option.createContentLine(block, option.extName)
          } else {
            option.content += `${option.createContentLine(block, option.extName)}\n`
          }
        } else {
          const hyphenIndex = Array.from(block).findIndex(symbol => symbol === '-')
          const camelCaseBlockName = `${block.slice(0, hyphenIndex)}${block.charAt(hyphenIndex + 1).toString().toUpperCase()}${block.slice(hyphenIndex + 2)}`
          const blockName = Array.from(block).includes('-') ? camelCaseBlockName : block

          jsContent.imports += `import ${blockName} from '../blocks/${block}/${block}'\n`
          jsContent.calls += `  ${blockName}()\n`
        }
      }

      if (index === allBlocks.length - 1 && option.extName === 'js') {
        jsContent.calls += '}'
        option.content = jsContent.imports + jsContent.calls
      }

      fs.writeFileSync(`${SRC_DIR}/${option.extName}/allBlocksImports.${option.extName}`, option.content)
    })
  })
  cb()
}
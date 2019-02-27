const fs = require('fs');
const config = require('./ws.config.json');

const wsLog = (msg) => {
  // выводит сообщения от имени WS
  console.log(`[WS] ${msg}`);
};

// Создает файл с указанным именем, расширением и конткнтом
const createFile = (name, extension, content) => {
  fs.writeFile(`${config.blocksDir}/${name}/${name}.${extension}`, content, (err) => {
    if (err) {
      throw err
    } else {
      wsLog(`"${name}/${name}.${extension}" успешно создан`);
    }
  });
};

const cb = (blockName) => {

  if (blockName === undefined) {
    wsLog(`Укажите название блока`);
  } else {
    // let arr = [1, 1, 2, 2, 3, 3];
    // let deduped = [...new Set(arr)] // [1, 2, 3]
    let extensions = config.extensions.concat(process.argv.slice(3));
    // let deduped = [...new Set(config.extensions.concat(process.argv.slice(3)))];

    fs.mkdir(`${config.blocksDir}/${blockName}`, (err) => {
      if (err) {
        wsLog(`Такой блок уже существует`);
      } else {
        wsLog(`Создаю блок "${blockName}"`);
        for (let [index, extension] of extensions.entries()) {
          let blockContent;

          if (extension === 'pug') {
            blockContent = `mixin ${blockName}()`;
            createFile(blockName, extension, blockContent);
          } else if (extension === 'sass') {
            blockContent = `.${blockName}`;
            createFile(blockName, extension, blockContent);
          } else if (extension === 'js') {
            blockContent = `const element = document.querySelector('.${blockName}');\n\nelement.addEventListener('click', () => {\n  console.log('click on ${blockName}')\n});`;
            createFile(blockName, extension, blockContent);
          } else if (extension === 'img') {
            // blockContent = `const element = document.querySelector('.${blockName}');\n\nelement.addEventListener('click', () => {\n  console.log('click on ${blockName}')\n});`;
            // createFile(blockName, extension, blockContent);


            fs.mkdir(`${config.blocksDir}/${blockName}/${extension}`, (err) => {
              if (err) {
                wsLog(`Такая папка уже существует`);
              } else {
                wsLog(`"${blockName}/${extension}/" успешно создан`);
              }
            });
          }
        }
      }
    });
  }
};

cb(process.argv[2]);
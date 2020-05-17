import markup from './tasks/markup'
import {styles} from './tasks/styles'
import scripts from './tasks/scripts'
import img from './tasks/images'
import fonts from './tasks/fonts'
import assets from './tasks/assets'

export const SRC_DIR = 'src'
export const APP_DIR = 'app'
export const BLOCKS_DIR = `${SRC_DIR}/blocks`
export const path = {
  markup: {
    src: `${SRC_DIR}/views/*.pug`,
    app: APP_DIR,
    watch: [
      `${SRC_DIR}/views/*.pug`,
      `${SRC_DIR}/blocks/**/*.pug`,
      `${SRC_DIR}/pug/**/*.pug`
    ],
    task: markup
  },
  styles: {
    src: `${SRC_DIR}/sass/main.sass`,
    app: `${APP_DIR}/css`,
    watch: [
      `${SRC_DIR}/blocks/**/*.sass`,
      `${SRC_DIR}/sass/**/*.sass`
    ],
    task: styles
  },
  scripts: {
    src: `${SRC_DIR}/js/common.js`,
    app: `${APP_DIR}/js`,
    watch: [
      `${SRC_DIR}/blocks/**/*.js`,
      `${SRC_DIR}/js/**/*.js`
    ],
    task: scripts
  },
  fonts: {
    src: `${SRC_DIR}/fonts/**/*.*`,
    app: `${APP_DIR}/fonts`,
    task: fonts
  },
  images: {
    src: `${SRC_DIR}/blocks/**/*.+(png|jpg|svg|gif|ico)`,
    app: `${APP_DIR}/img`,
    task: img
  },
  assets: {
    src: [
      `${SRC_DIR}/*.*`,
      `${SRC_DIR}/.htaccess`
    ],
    app: APP_DIR,
    task: assets
  }
}
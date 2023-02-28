import {
  markup,
  styles,
  scripts,
  fonts,
  images,
  assets,
  assetsPHPMailer,
  assetsPWA
} from './allTasks.js'

const SRC_DIR = 'src'
const APP_DIR = 'app'
const BLOCKS_DIR = `${SRC_DIR}/blocks`
const VIEWS_DIR = `${SRC_DIR}/views`
const projectPaths = {
  markup: {
    src: `${VIEWS_DIR}/*.pug`,
    app: APP_DIR,
    watch: [
      `${VIEWS_DIR}/*.pug`,
      `${BLOCKS_DIR}/**/*.pug`,
      `${SRC_DIR}/pug/**/*.pug`
    ],
    task: markup
  },
  styles: {
    src: `${SRC_DIR}/sass/pages/*.sass`,
    app: `${APP_DIR}/css`,
    watch: [
      `${BLOCKS_DIR}/**/*.sass`,
      `${SRC_DIR}/sass/**/*.sass`
    ],
    task: styles
  },
  scripts: {
    src: `${SRC_DIR}/js/pages/*.js`,
    app: `${APP_DIR}/js`,
    watch: [
      `${BLOCKS_DIR}/**/*.js`,
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
    src: `${BLOCKS_DIR}/**/*.+(png|jpg|jpeg|svg|webp|gif|ico)`,
    app: `${APP_DIR}/img`,
    task: images
  },
  assets: {
    src: [
      `${SRC_DIR}/*.*`,
      `${SRC_DIR}/.htaccess`,
      `!${SRC_DIR}/manifest.webmanifest`,
      `!${SRC_DIR}/sw.js`
    ],
    app: APP_DIR,
    task: assets
  },
  assetsPHPMailer: {
    src: [
      `${SRC_DIR}/PHPMailer/*/*.php`,
      `${SRC_DIR}/PHPMailer/*.php`
    ],
    app: `${APP_DIR}/PHPMailer`,
    task: assetsPHPMailer
  },
  assetsPWA: {
    src: [
      `${SRC_DIR}/manifest.webmanifest`,
      `${SRC_DIR}/sw.js`
    ],
    app: APP_DIR,
    task: assetsPWA
  }
}

export {
  SRC_DIR,
  APP_DIR,
  BLOCKS_DIR,
  VIEWS_DIR,
  projectPaths
}
import path from 'path'
import crypto from 'crypto'
import markup from './gulp/markup'
import {styles} from './gulp/styles'
import scripts from './gulp/scripts'
import img from './gulp/images'
import fonts from './gulp/fonts'
import assets from './gulp/assets'

export const SRC_DIR = 'src'
export const APP_DIR = 'app'
export const BLOCKS_DIR = `${SRC_DIR}/blocks`
export const VIEWS_DIR = `${SRC_DIR}/views`
export const projectPath = {
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
    src: `${SRC_DIR}/sass/pages/*.sass`,
    app: `${APP_DIR}/css`,
    watch: [
      `${SRC_DIR}/blocks/**/*.sass`,
      `${SRC_DIR}/sass/**/*.sass`
    ],
    task: styles
  },
  scripts: {
    src: `${SRC_DIR}/js/pages/*.js`,
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
    src: `${SRC_DIR}/blocks/**/*.+(png|jpg|jpeg|svg|webp|gif|ico)`,
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

export const localServer = {
  active: false,
  changeViewsExtToPHP: false,
  proxy: path.basename(process.cwd())
}

export const errorHandler = err => {
  console.log(err.message) // eslint-disable-line no-console
}

export const env = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV.trim() : 'development'
export const isProduction = env === 'production'
export const isDevelopment = env === 'development'

const crypter = (hashLength) => {
  const shasum = crypto.createHash('sha1')
  shasum.update((Math.random() * Math.random()).toString())
  const endHash = shasum.digest('hex')

  return endHash.slice(0, hashLength)
}

export const currentHash = crypter(24)
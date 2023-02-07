import {cleanApp, cleanCache} from './tasks/clean.js'
import markup from './tasks/markup.js'
import {stylesLint, styles} from './tasks/styles.js'
import scripts from './tasks/scripts.js'
import fonts from './tasks/fonts.js'
import images from './tasks/images.js'
import {assets, assetsPHPMailer, assetsPWA} from './tasks/assets.js'
import watcher from './tasks/watch.js'
import bSync from './tasks/browserSync.js'

export {
  cleanApp,
  cleanCache,
  markup,
  stylesLint,
  styles,
  scripts,
  fonts,
  images,
  assets,
  assetsPHPMailer,
  assetsPWA,
  watcher,
  bSync
}
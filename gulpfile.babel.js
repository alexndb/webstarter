import {parallel, series} from 'gulp'
import {cleanApp, cleanCache} from './gulp/clean'
import markup from './gulp/markup'
import {stylesLint, styles} from './gulp/styles'
import scripts from './gulp/scripts'
import fonts from './gulp/fonts'
import images from './gulp/images'
import assets from './gulp/assets'
import watcher from './gulp/watch'
import bSync from './gulp/browserSync'

const mainTasks = (() => series(
  styles, markup,
  parallel(scripts, fonts, images, assets)
))()

exports.cleanApp = cleanApp
exports.cleanCache = cleanCache
exports.markup = markup
exports.stylesLint = stylesLint
exports.styles = styles
exports.scripts = scripts
exports.fonts = fonts
exports.images = images
exports.assets = assets
exports.watcher = watcher
exports.bSync = bSync

exports.default = series(
  cleanApp,
  cleanCache,
  mainTasks,
  parallel(
    watcher,
    bSync
  )
)

exports.build = series(
  cleanApp,
  mainTasks
)
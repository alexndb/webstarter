import {parallel, series} from 'gulp'
import createAllImportsFiles from './gulp/tasks/createAllImportsFiles'
import {cleanApp, cleanCache} from './gulp/tasks/clean'
import markup from './gulp/tasks/markup'
import {stylesLint, styles} from './gulp/tasks/styles'
import scripts from './gulp/tasks/scripts'
import fonts from './gulp/tasks/fonts'
import images from './gulp/tasks/images'
import assets from './gulp/tasks/assets'
import watcher from './gulp/tasks/watch'
import bSync from './gulp/tasks/browserSync'

const mainTasks = (() => series(styles, markup, parallel(scripts, fonts, images, assets)))()

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
exports.createAllImportsFiles = createAllImportsFiles

exports.default = series(
  cleanApp,
  cleanCache,
  createAllImportsFiles,
  mainTasks,
  parallel(
    watcher,
    bSync
  )
)

exports.build = series(
  cleanApp,
  createAllImportsFiles,
  mainTasks
)
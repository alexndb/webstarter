import gulp from 'gulp'
import {
  cleanApp,
  cleanCache,
  markup,
  styles,
  scripts,
  fonts,
  images,
  assets,
  // assetsPWA,
  assetsPHPMailer,
  watcher,
  bSync
} from './bundler/allTasks.js'

const {parallel, series} = gulp
const mainTasks = (() => series(
  styles,
  markup,
  parallel(
    scripts,
    fonts,
    images,
    assets,
    // assetsPWA,
    assetsPHPMailer
  )
))()

const build = series(
  cleanApp,
  mainTasks
)

export default series(
  cleanApp,
  cleanCache,
  mainTasks,
  parallel(
    watcher,
    bSync
  )
)

export {
  build
}
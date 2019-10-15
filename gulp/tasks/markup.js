import browserSync from 'browser-sync'
import fs from 'fs'
import {src, dest} from 'gulp'
import gulpIf from 'gulp-if'
import pug from 'gulp-pug/index'
import pugPHPFilter from 'pug-php-filter'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import {path} from '../path'
import errorHandler from '../errorHandler'
import config from '../../ws.config'

export default function markup(cb) {
  const pugDefaultConfig = {
    pretty: false,
    locals: JSON.parse(fs.readFileSync(path.markup.data, 'utf8'))
  }

  const pugPHPConfig = {
    ...pugDefaultConfig,
    filters: {
      php: pugPHPFilter
    }
  }

  src(path.markup.src)
    .pipe(plumber({
      errorHandler: err => errorHandler(err)
    }))
    .pipe(pug(config.localServer.active ? pugPHPConfig : pugDefaultConfig))
    .pipe(gulpIf(config.localServer.active,
      rename(currentPath => {
        currentPath.extname = '.php'
      })))
    .pipe(dest(path.markup.app))
    .pipe(browserSync.stream({once: true}))
  cb()
}
import browserSync from 'browser-sync'
import {src, dest} from 'gulp'
import gulpIf from 'gulp-if'
import pug from 'gulp-pug/index'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import {path} from '../path'
import errorHandler from '../errorHandler'
import config from '../../ws.config'

// const css = require('../../src/sass/main.css.json')

export default function markup(cb) {
  src(path.markup.src)
    .pipe(plumber({
      errorHandler: err => errorHandler(err)
    }))
    .pipe(pug({
      // locals: {css},
      pretty: false
    }))
    .pipe(gulpIf(config.localServer.active,
      rename(currentPath => {
        currentPath.extname = '.php'
      })))
    .pipe(dest(path.markup.app))
    .pipe(browserSync.stream({once: true}))
  cb()
}
import browserSync from 'browser-sync'
import {src, dest} from 'gulp'
import gulpIf from 'gulp-if'
import pug from 'gulp-pug/index'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import {
  projectPath, localServer, errorHandler, currentHash
} from '../ws.config'

// const css = require('../../src/sass/main.css.json')

export default function markup(cb) {
  src(projectPath.markup.src)
    .pipe(plumber({
      errorHandler: err => errorHandler(err)
    }))
    .pipe(pug({
      locals: {
        currentHash
        // css
      },
      pretty: false
    }))
    .pipe(gulpIf(localServer.changeViewsExtToPHP,
      rename(currentPath => {
        currentPath.extname = '.php'
      })))
    .pipe(dest(projectPath.markup.app))
    .pipe(browserSync.stream({once: true}))
  cb()
}
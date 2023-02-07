import gulp from 'gulp'
import browserSync from 'browser-sync'
import gulpIf from 'gulp-if'
import pug from 'gulp-pug'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import {projectPaths} from '../paths.js'
import {localServer, currentHash} from '../config.js'
import {errorHandler} from '../helpers.js'

const {src, dest} = gulp

export default function markup(cb) {
  src(projectPaths.markup.src)
    .pipe(plumber({
      errorHandler: err => errorHandler(err)
    }))
    .pipe(pug({
      locals: {
        currentHash
      },
      pretty: false
    }))
    .pipe(gulpIf(
      localServer.changeViewsExtToPHP,
      rename(currentPath => {
        currentPath.extname = '.php'
      })
    ))
    .pipe(dest(projectPaths.markup.app))
    .pipe(browserSync.stream({once: true}))
  cb()
}
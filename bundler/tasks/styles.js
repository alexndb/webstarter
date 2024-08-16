import autoprefixer from 'autoprefixer'
import browserSync from 'browser-sync'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import cssnano from 'cssnano'
import mqpacker from 'css-mqpacker'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import sortCSSmq from 'sort-css-media-queries'
import sourcemaps from 'gulp-sourcemaps'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sassLint from 'gulp-sass-lint'
import {projectPaths} from '../paths.js'
import {errorHandler} from '../helpers.js'
import {isDevelopment} from '../config.js'

const {src, dest} = gulp
const sass = gulpSass(dartSass)

function stylesLint(cb) {
  src(projectPaths.styles.watch)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
  cb()
}

function styles(cb) {
  const commonPlugins = [
    autoprefixer({
      grid: true
    })
  ]
  const postCSSDevPlugins = [
    ...commonPlugins
  ]
  const postCSSProdPlugins = [
    ...commonPlugins,
    mqpacker({
      sort: sortCSSmq.desktopFirst
    }),
    cssnano()
  ]

  stylesLint(cb)

  src(projectPaths.styles.src)
    .pipe(plumber({
      errorHandler: err => errorHandler(err)
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(postcss(isDevelopment ? postCSSDevPlugins : postCSSProdPlugins))
    .pipe(gulpIf(isDevelopment, sourcemaps.write('./')))
    .pipe(dest(projectPaths.styles.app))
    .pipe(browserSync.reload({stream: true}))
  cb()
}

export {
  styles,
  stylesLint
}
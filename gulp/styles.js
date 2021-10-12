import autoprefixer from 'autoprefixer'
import browserSync from 'browser-sync'
import {src, dest} from 'gulp'
import gulpIf from 'gulp-if'
import cssnano from 'cssnano'
import mqpacker from 'css-mqpacker'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import objectFitImages from 'postcss-object-fit-images'
import sortCSSmq from 'sort-css-media-queries'
import sourcemaps from 'gulp-sourcemaps'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sassLint from 'gulp-sass-lint'
import rename from 'gulp-rename'
import {
  projectPath, errorHandler, isDevelopment, currentHash
} from '../ws.config'

const sass = gulpSass(dartSass)

export function stylesLint(cb) {
  src(projectPath.styles.watch)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
  cb()
}

export function styles(cb) {
  const commonPlugins = [
    autoprefixer({
      grid: true
    }),
    objectFitImages()
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

  src(projectPath.styles.src)
    .pipe(plumber({
      errorHandler: err => errorHandler(err)
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(postcss(isDevelopment ? postCSSDevPlugins : postCSSProdPlugins))
    .pipe(gulpIf(isDevelopment, sourcemaps.write('./', {
      sourceMappingURL: (file) => `${file.relative}.${currentHash}.map`
    })))
    .pipe(rename(currentPath => {
      currentPath.basename += `.${currentHash}`
    }))
    .pipe(dest(projectPath.styles.app))
    .pipe(browserSync.reload({stream: true}))
  cb()
}
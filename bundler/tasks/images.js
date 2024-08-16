import gulp from 'gulp'
import browserSync from 'browser-sync'
import gulpIf from 'gulp-if'
import rename from 'gulp-rename'
import imagemin from 'gulp-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import {projectPaths} from '../paths.js'
import {isProduction} from '../config.js'

const {src, dest} = gulp

export default function images(cb) {
  src(projectPaths.images.src, {encoding: false})
    .pipe(gulpIf(isProduction, imagemin(
      [
        imageminMozjpeg(),
        imageminPngquant()
      ],
      {
        // verbose: true
      }
    )))
    .pipe(rename(currentPath => {
      currentPath.dirname = currentPath.dirname.replace('\\img', '')
    }))
    .pipe(dest(projectPaths.images.app))
  browserSync.reload()
  cb()
}
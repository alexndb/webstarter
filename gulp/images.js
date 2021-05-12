import browserSync from 'browser-sync'
import {src, dest} from 'gulp'
import gulpIf from 'gulp-if'
import rename from 'gulp-rename'
import imagemin from 'gulp-imagemin'
import mozjpeg from 'imagemin-mozjpeg'
import pngquant from 'imagemin-pngquant/index'
import {projectPath, isProduction} from '../ws.config'

export default function images(cb) {
  src(projectPath.images.src)
    .pipe(gulpIf(isProduction, imagemin(
      [
        mozjpeg(),
        pngquant(),
        imagemin.svgo(),
        imagemin.gifsicle()
      ],
      {
        // verbose: true
      }
    )))
    .pipe(rename(currentPath => {
      currentPath.dirname = currentPath.dirname.replace('\\img', '')
    }))
    .pipe(dest(projectPath.images.app))
  browserSync.reload()
  cb()
}
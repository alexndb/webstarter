import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';

import {path} from '../../path';
import NODE_ENV from "../../env";
import gulpIf from "gulp-if";
import browserSync from "browser-sync";

browserSync.create();

const condition = NODE_ENV === 'production';

export default () => {
  return gulp.task('img', (done) => {
    /**
     * Оптимизирует и перемещает все изображения из папки src в папку app/img
     */
    gulp.src(path.img.src)
      .pipe(gulpIf(condition, imagemin([
          mozjpeg(),
          pngquant(),
          imagemin.svgo(),
          imagemin.gifsicle()],
        {
          verbose: true
        }
      )))
      .pipe(gulp.dest(path.img.app))
      .pipe(browserSync.stream());
    done();
  });
};
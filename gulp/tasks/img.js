import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';

import {path} from '../path';

export default () => {
  return gulp.task('img', (done) => {
    /**
     * Оптимизирует и перемещает все изображения из папки src/img в папку app/img
     */
    gulp.src(path.img.src)
      .pipe(imagemin([
          imagemin.gifsicle(),
          mozjpeg(), pngquant(),
          imagemin.svgo()],
        {
          verbose: true
        }
      ))
      .pipe(gulp.dest(path.img.app));
    done();
  });
};
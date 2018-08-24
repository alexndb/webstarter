import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';

import {path} from '../../path';

export default () => {
  return gulp.task('img', (done) => {
    /**
     * Оптимизирует и перемещает все изображения из папки src в папку app/img
     */
    gulp.src(path.img.src)
      .pipe(imagemin([
          mozjpeg(),
          pngquant(),
          imagemin.svgo(),
          imagemin.gifsicle()],
        {
          verbose: true
        }
      ))
      .pipe(gulp.dest(path.img.app));
    done();
  });
};
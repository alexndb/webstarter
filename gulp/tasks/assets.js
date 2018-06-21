import gulp from 'gulp';

import {APP_DIR, SRC_DIR} from '../path';

export default () => {
  return gulp.task('assets', (done) => {
    /**
     * Перемещает все файлы из корня папки SRC_DIR в корень папки APP_DIR
     */
    gulp.src([SRC_DIR + '/*.*', SRC_DIR + '/.htaccess'])
      .pipe(gulp.dest(APP_DIR));
    done();
  });
};
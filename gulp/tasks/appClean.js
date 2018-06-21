import del from 'del';
import gulp from 'gulp';
import vinylPaths from 'vinyl-paths';

import {APP_DIR} from '../path';

export default () => {
  return gulp.task('appClean', () => {
    /**
     * Удаляет папку APP_DIR
     */
    return gulp.src(APP_DIR, {
      allowEmpty: true
    })
      .pipe(vinylPaths(del));
  });
};
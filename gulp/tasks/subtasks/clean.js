import cache from "gulp-cache";
import del from 'del';
import gulp from 'gulp';
import vinylPaths from 'vinyl-paths';

import {APP_DIR} from '../../path';

let delThis = (taskName, path) => {
  return gulp.task(taskName, () => {
    /**
     * Удаляет папку/файл
     *
     * taskName - имя задачи для gulp.task
     * path - папка/файл для удаления
     */
    return gulp.src(path, {
      allowEmpty: true
    })
      .pipe(vinylPaths(del));
  });
};

export let cleanCache = () => {
  /**
   * Очищает кэш браузера
   */
  return gulp.task('clean:cache', (done) => {
      cache.clearAll();
      done();
    }
  );
};

export let cleanApp = () => {
  delThis('clean:app', APP_DIR);
};
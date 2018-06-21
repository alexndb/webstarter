import cache from "gulp-cache";
import gulp from "gulp";

export default () => {
  /**
   * Очищает кэш браузера
   */
  return gulp.task('cacheClear', (done) => {
      cache.clearAll();
      done();
    }
  );
};
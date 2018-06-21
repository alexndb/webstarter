import browserSync from 'browser-sync';
import gulp from 'gulp';

browserSync.create();

import {APP_DIR} from '../path';

export default () => {
  return gulp.task('browserSync', () => {
    /**
     * proxy - отслеживает локальный сервер по указанному адресу
     * server - отслеживает статичную папку APP_DIR
     */
    browserSync.init({
      proxy: "workflow/webstarter/" + APP_DIR
    });
    // browserSync.init({
    //   server: ["./", APP_DIR]
    // });
  });
};
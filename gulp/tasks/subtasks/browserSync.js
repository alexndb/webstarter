import browserSync from 'browser-sync'
import gulp from 'gulp'

browserSync.create()

import {APP_DIR} from '../../path'
import config from '../../../ws.config.json'

export default () => {
  return gulp.task('browserSync', () => {
    /**
     * proxy - отслеживает локальный сервер по указанному адресу
     * server - отслеживает статичную папку APP_DIR
     */
    // browserSync.init({
    //   proxy: `${config.proxy}/` + APP_DIR
    // });
    browserSync.init({
      server: ['./', APP_DIR]
    })
  })
};
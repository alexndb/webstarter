import browserSync from 'browser-sync';
import fs from 'fs';
import gulp from 'gulp';
import nodePath from 'path';
import notifier from 'node-notifier';
import pug from 'gulp-pug';
import pugPHPFilter from 'pug-php-filter';
import rename from 'gulp-rename';

import {path} from '../../path';
import NODE_ENV from '../../env';

browserSync.create();

export default () => {
  return gulp.task('markup', () => {
    /**
     * rename -  раскомментировать, если необходимы файлы с разметкой PHP
     *
     * Внутри pug файлов PHP код реализуется вставками фильтра
     * :php
     *   echo 'Hello world!';
     */
    return gulp.src(path.pug.src)
      .pipe(pug({
        pretty: NODE_ENV === 'production' ? '\t' : false,
        locals: JSON.parse(fs.readFileSync(path.pug.data, 'utf8')),
        filters: {
          php: pugPHPFilter
        }
      }).on('error', (err) => {
        notifier.notify({
          title: 'Pug Error',
          message: err.message,
          icon: nodePath.join('../' + __dirname, 'icons/pug.png')
        });
        this.end();
      }))
      // .pipe(rename((path) => {
      //   path.extname = ".php"
      // }))
      .pipe(gulp.dest(path.pug.app))
      .pipe(browserSync.stream());
  });
};
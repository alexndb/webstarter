import browserSync from 'browser-sync';
import gulp from 'gulp';
import nodePath from 'path';
import notifier from 'node-notifier';
import pug from 'gulp-pug';
import pugPHPFilter from 'pug-php-filter';
import rename from 'gulp-rename';
import wiredep from 'wiredep';

import {path} from '../path';

import YOUR_LOCALS from '../../src/pug/_data/locals.json';

browserSync.create();

export default () => {
  return gulp.task('markup', () => {
    /**
     * YOUR_LOCALS - json-файл с переменными для разметки Pug
     *
     * wiredep - Автоматический поиск используемых в проекте библиотек bower и добавление ссылок на них в html
     * <!-- bower:js -->
     <script src="bower_components/jquery/dist/jquery.js"></script>
     <!-- endbower -->
     
     * rename -  раскомментировать, если необходимы файлы с разметкой PHP
     *
     * Внутри pug файлов PHP код реализуется вставками фильтра
     * :php
     *   echo 'Hello world!';
     */
    return gulp.src(path.pug.srcPages)
      .pipe(pug({
        pretty: '\t',
        locals: YOUR_LOCALS,
        filters: {
          php: pugPHPFilter
        }
      }).on('error', (err) => {
        notifier.notify({
          title: 'Pug Error',
          message: err.message,
          icon: nodePath.join(__dirname, 'icons/pug.png')
        });
        this.end();
      }))
      .pipe(wiredep.stream({
        directory: './bower_components',
        ignorePath: '../../'
      }))
      // .pipe(rename((path) => {
      //   path.extname = ".php"
      // }))
      .pipe(gulp.dest(path.pug.app))
      .pipe(browserSync.stream());
  });
};
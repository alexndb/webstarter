import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import minifyCss from 'gulp-clean-css';
import nodePath from 'path';
import notifier from 'node-notifier';
import rename from "gulp-rename";
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

import {path} from '../../path';

browserSync.create();

export default () => {
  gulp.task('styles', (done) => {
    gulp.src(path.sass.src)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', (err) => {
        notifier.notify({
          title: 'Sass Error',
          message: err.message,
          icon: nodePath.join('../' + __dirname, 'icons/sass.png')
        });
      }))
      .pipe(autoprefixer({
        browsers: ['last 10 versions']
      }))
      .pipe(minifyCss())
      .pipe(rename('main.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(path.sass.app))
      .pipe(browserSync.stream());
    done();
  });
};
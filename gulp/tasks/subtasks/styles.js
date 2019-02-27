import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import minifyCss from 'gulp-clean-css';
import nodePath from 'path';
import notifier from 'node-notifier';
import rename from "gulp-rename";
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

import {path} from '../../path';
import NODE_ENV from '../../env';

browserSync.create();

const condition = NODE_ENV === 'production';

export default () => {
  gulp.task('styles', (done) => {
    gulp.src(path.sass.src)
      .pipe(gulpIf(!condition, sourcemaps.init()))
      .pipe(sass().on('error', (err) => {
        console.log(err);
        notifier.notify({
          title: 'Sass Error',
          message: err.message,
          icon: nodePath.join(__dirname, 'icons/sass.png')
        });
      }))
      .pipe(gulpIf(condition, autoprefixer({
        browsers: ['last 10 versions']
      })))
      .pipe(gulpIf(condition, minifyCss()))
      .pipe(rename('main.min.css'))
      .pipe(gulpIf(!condition, sourcemaps.write('./')))
      .pipe(gulp.dest(path.sass.app))
      .pipe(browserSync.stream());
    done();
  });
};
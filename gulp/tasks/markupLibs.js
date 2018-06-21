import gulp from 'gulp';
import gulpif from 'gulp-if';
import lazypipe from 'lazypipe';
import minifyCss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import useref from 'gulp-useref';

import {APP_DIR, path} from '../path';

export default () => {
  return gulp.task('markupLibs', (done) => {
    gulp.src([APP_DIR + '/*.html', APP_DIR + '/*.php'])
    /**
     * useref - объединение файлов всех используемых библиотек bower в файлы libs.css + libs.js и их подключение в проект
     */
      .pipe(useref({},
        lazypipe()
          .pipe(sourcemaps.init, {
            loadMaps: true
          })))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulpif('*.js', uglify()))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(path.pug.app));
    done();
  });
};
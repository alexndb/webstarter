import gulp from 'gulp'

import {path} from '../../path'

export default () => {
  return gulp.task('fonts', (done) => {
    /**
     * Перемещает шрифты из папки src/fonts в папку app/fonts
     */
    gulp.src(path.fonts.src)
      .pipe(gulp.dest(path.fonts.app))
    done()
  })
};
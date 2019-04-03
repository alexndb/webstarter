import gulp from 'gulp'

import {SRC_DIR, path} from '../path'

export default () => {
  return gulp.task('watch', () => {
    gulp.watch(path.pug.watch, gulp.series('markup'))
    gulp.watch(path.sass.watch, gulp.series('styles'))
    gulp.watch(path.js.watch, gulp.series('scripts'))
    gulp.watch(path.img.src, gulp.series('img'))
    gulp.watch(path.fonts.src, gulp.series('fonts'))
    gulp.watch(SRC_DIR + '/*.*', gulp.series('assets'))
  })
};
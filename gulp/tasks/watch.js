import gulp from 'gulp';

import {SRC_DIR, path} from '../path';

export default () => {
  return gulp.task('watch', () => {
    gulp.watch(path.pug.srcAll, gulp.series('markup'));
    gulp.watch(path.sass.srcAll, gulp.series('styles'));
    gulp.watch(path.js.watch, gulp.series('scripts'));
    gulp.watch(path.img.src, gulp.series('imgClean', 'img'));
    gulp.watch(path.fonts.src, gulp.series('fonts'));
    gulp.watch(SRC_DIR + '/*.*', gulp.series('assets'));
  });
};
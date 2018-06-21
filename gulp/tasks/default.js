import gulp from 'gulp';

export default () => {
  return gulp.task(
    'default',
    gulp.series(
      'appClean', 'cacheClear',
      gulp.parallel(
        'markup', 'styles', 'scripts', 'fonts',
        gulp.series('imgClean', 'img'),
        'assets'
      ),
      gulp.parallel('watch', 'browserSync')
    ));
};
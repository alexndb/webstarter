import gulp from 'gulp';

export default () => {
  return gulp.task(
    'build',
    gulp.series(
      'appClean', 'cacheClear',
      gulp.parallel(
        gulp.series('markup', 'markupLibs'),
        'styles', 'scripts', 'fonts',
        gulp.series('imgClean', 'img'),
        'assets'
      )
    ));
};
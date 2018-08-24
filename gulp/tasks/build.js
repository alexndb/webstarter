import gulp from 'gulp';

export default () => {
  return gulp.task(
    'build',
    gulp.series(
      'clean:app',
      'sprite:png',
      gulp.parallel(
        'markup',
        'styles',
        'scripts',
        'fonts',
        'img',
        'sprite:svg',
        'assets'
      )
    ));
};
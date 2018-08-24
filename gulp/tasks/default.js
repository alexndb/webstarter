import gulp from 'gulp';

export default () => {
  return gulp.task(
    'default',
    gulp.series(
      'clean:app',
      'clean:cache',
      'sprite:png',
      gulp.parallel(
        'markup',
        'styles',
        'scripts',
        'fonts',
        'img',
        'sprite:svg',
        'assets'
      ),
      gulp.parallel('watch', 'browserSync')
    ));
};
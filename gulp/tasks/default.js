import gulp from 'gulp'

export default () => {
  return gulp.task(
    'default',
    gulp.series(
      'clean:app',
      'clean:cache',
      gulp.parallel(
        'markup',
        'styles',
        'scripts',
        'fonts',
        'img',
        'assets'
      ),
      gulp.parallel('watch', 'browserSync')
    ))
};
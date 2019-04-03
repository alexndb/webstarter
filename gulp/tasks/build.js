import gulp from 'gulp'

export default () => {
  return gulp.task(
    'build',
    gulp.series(
      'clean:app',
      gulp.parallel(
        'markup',
        'styles',
        'scripts',
        'fonts',
        'img',
        'assets'
      )
    ))
};
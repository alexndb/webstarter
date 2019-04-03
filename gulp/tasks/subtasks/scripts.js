import browserSync from 'browser-sync'
import gulp from 'gulp'
import gulpWebpack from 'webpack-stream'
import nodePath from 'path'
import notifier from 'node-notifier'
import webpack from 'webpack'
import webpackConfig from '../../../webpack.config'

import {path} from '../../path'

browserSync.create()

export default () => {
  return gulp.task('scripts', () => {
    return gulp.src(path.js.src)
      .pipe(gulpWebpack(webpackConfig, webpack).on('error', (err) => {
        console.log(err)
        notifier.notify({
          title: 'JavaScript Error',
          message: 'fix it',
          icon: nodePath.join(__dirname, 'icons/js.png')
        })
        this.end()
      }))
      .pipe(gulp.dest(path.js.app))
      .pipe(browserSync.stream())
  })
}
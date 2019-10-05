import browserSync from 'browser-sync'
import {src, dest} from 'gulp'
import gulpWebpack from 'webpack-stream'
import plumber from 'gulp-plumber'
import webpack from 'webpack'
import errorHandler from '../errorHandler'
import webpackConfig from '../../webpack.config'
import {path} from '../path'

export default function scripts() {
  return src(path.scripts.src)
    .pipe(plumber({
      errorHandler: err => errorHandler(err, 'Javascript', 'js.png')
    }))
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(dest(path.scripts.app))
    .pipe(browserSync.stream({once: true}))
}
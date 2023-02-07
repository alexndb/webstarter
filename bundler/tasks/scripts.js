import browserSync from 'browser-sync'
import fs from 'fs'
import gulp from 'gulp'
import gulpWebpack from 'webpack-stream'
import plumber from 'gulp-plumber'
import webpack from 'webpack'
import webpackConfig from '../../webpack.config.js'
import {projectPaths} from '../paths.js'
import {errorHandler} from '../helpers.js'

const {src, dest} = gulp
const pagesReader = () => {
  const entries = {}

  try {
    const files = fs.readdirSync('./src/js/pages')
    for (const file of files) {
      const fileNameKey = file.replace('.js', '')
      entries[fileNameKey] = `./src/js/pages/${file}`
    }
  } catch (e) {
    throw new Error(e)
  }
  return entries
}

export default function scripts() {
  return src(projectPaths.scripts.src)
    .pipe(plumber({
      errorHandler: err => errorHandler(err)
    }))
    .pipe(gulpWebpack({
      entry: pagesReader(),
      ...webpackConfig
    }, webpack))
    .pipe(dest(projectPaths.scripts.app))
    .pipe(browserSync.stream({once: true}))
}
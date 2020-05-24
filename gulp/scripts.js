import browserSync from 'browser-sync'
import fs from 'fs'
import {src, dest} from 'gulp'
import gulpWebpack from 'webpack-stream'
import plumber from 'gulp-plumber'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import {projectPath, errorHandler} from '../ws.config'

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
  return src(projectPath.scripts.src)
    .pipe(plumber({
      errorHandler: err => errorHandler(err)
    }))
    .pipe(gulpWebpack({
      entry: pagesReader(),
      ...webpackConfig
    }, webpack))
    .pipe(dest(projectPath.scripts.app))
    .pipe(browserSync.stream({once: true}))
}
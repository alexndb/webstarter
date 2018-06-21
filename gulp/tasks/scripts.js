import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpWebpack from 'webpack-stream';
import nodePath from 'path';
import notifier from 'node-notifier';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import {path} from '../path';

browserSync.create();

export default () => {
  return gulp.task('scripts', () => {
    return gulp.src(path.js.src)
      .pipe(gulpWebpack({
        devtool: 'source-map',
        module: {
          rules: [{
            use: [{
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            }]
          }]
        },
        output: {
          filename: 'common.min.js'
        },
        plugins: [new UglifyJsPlugin({
          sourceMap: true
        })]
      }).on('error', (err) => {
        notifier.notify({
          title: 'JavaScript Error',
          message: err.message,
          icon: nodePath.join(__dirname, 'icons/js.png')
        });
        this.end();
      }))
      .pipe(gulp.dest(path.js.app))
      .pipe(browserSync.stream());
  });
};
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpWebpack from 'webpack-stream';
import nodePath from 'path';
import notifier from 'node-notifier';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import {path} from '../../path';
import NODE_ENV from '../../env';

browserSync.create();

const babelOptions = {
  rules: [{
    use: [{
      loader: 'babel-loader',
      query: {
        presets: [
          'env',
          'stage-3'
        ]
      }
    }]
  }]
};

export default () => {
  console.log(NODE_ENV)
  return gulp.task('scripts', () => {
    return gulp.src(path.js.src)
      .pipe(gulpWebpack({
        devtool: NODE_ENV === 'production' ? 'source-map' : 'eval',
        module: NODE_ENV === 'production' ? babelOptions : {},
        output: {
          filename: 'common.min.js'
        },
        plugins: NODE_ENV === 'production' ? [new UglifyJsPlugin({sourceMap: true})] : []
      }).on('error', (err) => {
        notifier.notify({
          title: 'JavaScript Error',
          message: err.message,
          icon: nodePath.join('../' + __dirname, 'icons/js.png')
        });
        this.end();
      }))
      .pipe(gulp.dest(path.js.app))
      .pipe(browserSync.stream());
  });
};
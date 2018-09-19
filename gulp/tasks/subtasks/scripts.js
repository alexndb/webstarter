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
const condition = NODE_ENV === 'production';

export default () => {
  return gulp.task('scripts', () => {
    return gulp.src(path.js.src)
      .pipe(gulpWebpack({
        devtool: condition ? false : 'eval',
        module: condition ? babelOptions : {},
        output: {
          filename: 'common.min.js'
        },
        plugins: condition ? [new UglifyJsPlugin({sourceMap: false})] : []
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
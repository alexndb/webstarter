import path from 'path'
import {isProduction} from './gulp/env'

export default {
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: './src/js/common.js'
  },
  output: {
    path: path.resolve(__dirname, './app/js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: 'eslint-loader'
        }
      ]
    }]
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000
  },
  devtool: isProduction ? false : 'eval'
}
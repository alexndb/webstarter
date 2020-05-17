import path from 'path'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import {isProduction} from './gulp/env'

const optimization = () => {
  const config = {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProduction) {
    config.minimizer = [
      new TerserWebpackPlugin()
    ]
  }

  return config
}

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
      exclude: /node_modules/,
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
  optimization: optimization(),
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000
  },
  devtool: isProduction ? false : 'eval'
}
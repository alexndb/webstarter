import ESLintPlugin from 'eslint-webpack-plugin'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import {isProduction, currentHash} from './ws.config'

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
  output: {
    filename: () => `[name].${currentHash}.js`
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    }]
  },
  // optimization: optimization(),
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000
  },
  plugins: [
    new ESLintPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  devtool: isProduction ? false : 'eval'
}
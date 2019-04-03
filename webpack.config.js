import NODE_ENV from './gulp/env'

const babelOptions = {
  rules: [{
    use: [{
      loader: 'babel-loader'
    }]
  }]
}
const isProduction = NODE_ENV === 'production'

export default {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'eval',
  module: isProduction ? babelOptions : {},
  output: {
    filename: 'bundle.js'
  }
}
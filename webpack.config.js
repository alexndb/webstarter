module.exports = {
  entry: './src/js/common.js',
  output: {
    filename: 'common.js',
    path: './app/js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: 'node_modules',
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
const path = require('path')

const PORT = process.env.PORT || 3000

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'client'),
  },
  output: {
    publicPath: `http://localhost:${PORT}/dist/`,
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      }
    ]
  }
}
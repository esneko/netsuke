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
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', {modules: false}]
          ]
        }
      }]
    }]
  }
}

const connect = require('connect')
const webpack = require('webpack')
const webpackMiddleware = require("webpack-dev-middleware")
const config = require('../../webpack.config')

const app = connect()

const compiler = webpack(config)

app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))

module.exports = app
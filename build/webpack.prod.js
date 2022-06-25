const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'eval-cheap-module-source-map'
})

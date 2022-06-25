const prodConfig = require('./webpack.prod')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin() // 实例化
const { merge } = require('webpack-merge') // 引入合并webpack配置方法


// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
module.exports = smp.wrap(merge(prodConfig, {
  
}))

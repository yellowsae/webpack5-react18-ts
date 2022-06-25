// webpack.base.js  webpack 的公共配置

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  // 入口文件
  entry: path.join(__dirname, '../src/index.tsx'),


  // 打包出口文件
  output: {
    filename: 'static/js/[name].js',
    path: path.join(__dirname, '../dist'),
    // 自动删除 dist 文件夹
    clean: true,
    // 打包后文件的公共前缀路径
    // publicPath: '/'
  },
  resolve: {
    // 
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: 'babel-loader',
          options: {
            // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /.(css|less)$/,  // 匹配.css文件
        use: [
          'style-loader',
          'css-loader',
          // css 兼容
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ]
}


console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)

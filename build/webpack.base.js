// webpack.base.js  webpack 的公共配置

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
  // 入口文件
  entry: path.join(__dirname, '../src/index.tsx'),
  // 开启缓存
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  // 打包出口文件
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',   // 加上[chunkhash:8]是为了防止缓存
    path: path.join(__dirname, '../dist'),
    // 自动删除 dist 文件夹
    clean: true,
    // 打包后文件的公共前缀路径
    // publicPath: '/'
  },
  resolve: {
    // 配置省略后缀名， 必须加上 .xxx  .xxx
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.join(__dirname, '../src'),
    }
  },
  module: {
    rules: [

      {
        include: [path.resolve(__dirname, '../src')], // 只对项目src文件的ts,tsx进行loader解析
        // modules: [path.resolve(__dirname, '../node_modules')],
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: [
          'thread-loader',
          'babel-loader'
        ]
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     // 预设执行顺序由右往左,所以先处理ts,再处理jsx
        //     presets: [
        //       '@babel/preset-react',
        //       '@babel/preset-typescript'
        //     ]
        //   }
        // }
      },
      {
        include: [path.resolve(__dirname, '../src')],
        // modules: [path.resolve(__dirname, '../node_modules')],
        test: /.(css|less)$/,  // 匹配.css文件
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          // 'style-loader',
          'css-loader',
          // css 兼容
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
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
    }),
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
          filter: source => {
            return !source.includes('index.html') // 忽略index.html
          }
        },
      ],
    }),
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ]
}


console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)

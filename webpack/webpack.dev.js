/**
 * This config file is used to enable the webpack-dev-middleware in server/server.js when run in dev
 */
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//need to figure out css hot reloading. could not get that to work..
const env = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV)
}

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&hot=true&quiet=true&noInfo=false', 
    './app/src/index.js'
  ],
  devtool: 'eval',
  output: {
    path: '/',
    filename: '[name].build.js',
    publicPath: '/',
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '<title>React App Container</title>',
      template: path.join(__dirname, '../app/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
    }),
  ],
})

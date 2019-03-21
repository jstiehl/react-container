const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const babel = require('./loaders/babel')
const styles = require('./loaders/styles')('production')
const images = require('./loaders/images')

const env = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV)
}

module.exports = {
  entry: {
    app: ['babel-polyfill', './app/src/index.js'],
    css: './app/sass/main.scss',
  },
  output: {
    path: __dirname + '/../app/dist',
    filename: '[name].build.js',
    publicPath: '/',
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React App Container',
      template: path.join(__dirname, '../app/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      babel,
      styles,
      images,
      {
        test: /\.snap$/,
        loader: 'ignore-loader',
      },
    ],
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
}

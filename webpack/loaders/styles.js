const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function(env) {
  let loader =
    env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
  return {
    test: /\.scss$/,
    use: [loader, 'css-loader', 'sass-loader'],
  }
}

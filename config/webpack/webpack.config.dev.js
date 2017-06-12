var config = require('./config');
var baseWebpack = require('./webpack.config.common');

var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseWebpack, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:' + config.port,
    'webpack/hot/only-dev-server',
    './src/index.tsx'
  ],
  output: {
    path: config.dist,
    publicPath: "/",
    filename: "app.[hash:7].js"
  },
  devtool: '#source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      template: "./index.hbs"
    }),
    new FriendlyErrorsPlugin()
  ]
});

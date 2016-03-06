/* eslint-disable */
const join = require('path').join;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.NoErrorsPlugin(),
  new HtmlWebpackPlugin({
    title: 'GO-CI'
  })
];

module.exports = {
  entry: {
    main: ['./app/scripts/main.js', './app/styles/main.scss']
  },
  node: {
    buffer: false,
    __filename: true
  },
  output: {
    path: '/Users/ckeyer/github.com/ckeyer/go-ci/assets',
    // filename: 'bundle.js',
    filename: '[name]_[hash].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.(scss|css)$/, loader: 'style!css!sass'},
      {test: /\.(eot|woff|woff2|ttf|svg|png|jpg)($|\?)/, loader: 'file'}
    ]
  },
  resolve: {
    extensions: ['', '.scss', '.js', '.json']
  },
  plugins
};


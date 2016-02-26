/* eslint-disable */
var join = require('path').join;

module.exports = {
  entry: {
    main: ['./app/scripts/main.js', './app/styles/main.scss']
  },
  node: {
    buffer: false,
    __filename: true
  },
  output: {
    path: join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.(scss|css)$/, loader: 'style!css!sass'}
    ]
  },
  resolve: {
    extensions: ['', '.scss', '.js', '.json']
  }
};

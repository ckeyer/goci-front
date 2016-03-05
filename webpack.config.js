/* eslint-disable */
const join = require('path').join;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PageGeneratorPlugin = function() {};

PageGeneratorPlugin.prototype.apply = function(compiler) {
  const emitHtml = this.emitHtml.bind(this);
  compiler.plugin('emit', (compilation, callback) => {
    const bundleName = compilation.namedChunks.main.files[0];
    const code = compilation.assets[bundleName].source();
    const indexHtml = compilation.assets['default.html'].source();
    const exports = {};
    const window = {};
    const module = {
      exports, // to bypass linter's unused variables checking
      window   // to bypass linter's unused variables checking
    };
    eval(code); // eslint-disable-line no-eval

    const NSApp = module.exports;
    const paths = ['/browser_not_supported.html'];

    const promises = paths.map(path => new Promise(resolve => {
      NSApp.start({
        path,
        callback(html, pageMeta) {
          emitHtml(path, html, pageMeta, indexHtml, compilation);
          resolve(html);
        }
      });
    }));

    Promise.all(promises).then(() => callback());
  });
};

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


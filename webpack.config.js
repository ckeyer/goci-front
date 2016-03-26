const join = require('path').join;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PageGeneratorPlugin = function() {};

PageGeneratorPlugin.prototype.pathToFilename = function(path) {
  if (path === '/') {
    return 'index.html';
  }

  path = path.replace('/', '');

  if (path.indexOf('.html') === -1) {
    path += '.html';
  }

  return path;
};

PageGeneratorPlugin.prototype.emitHtml = function(path, html, pageMeta, template, compilation) {
  const filename = this.pathToFilename(path);
  compilation.assets[filename] = {
    source() {
      const title = pageMeta.title || '';
      return template
        .replace('<title>ckeyer</title>', `<title>${title}</title>`)
        .replace('<!-- body -->', html);
    },
    size() {
      return html.length;
    }
  };
};

PageGeneratorPlugin.prototype.apply = function(compiler) {
  const emitHtml = this.emitHtml.bind(this);
  compiler.plugin('emit', (compilation, callback) => {
    const bundleName = compilation.namedChunks.main.files[0];
    const code = compilation.assets[bundleName].source();
    const indexHtml = compilation.assets['index.html'].source();
    const exports = {};
    const window = {};
    const module = {
      exports, // to bypass linter's unused variables checking
      window   // to bypass linter's unused variables checking
    };
    eval(code); // eslint-disable-line no-eval

    const CIApp = module.exports;
    const paths = ['/browser_not_supported.html'];
  });
};


const plugins = [
  new webpack.NoErrorsPlugin(),
  new HtmlWebpackPlugin({
    title: 'GO-CI',
    favicon: 'images/favicon.png',
    template: 'index.html',
    filename: 'index.html',
    inject: false,
    env: process.env.NODE_ENV
  }),
  new webpack.DefinePlugin({
    'process.env': {}
  })
];

const config = {
  context: join(__dirname, '/app'),
  devtool: 'hidden-source-map',
  entry: {
    main: ['./scripts/main.js', './styles/main.scss']
  },
  node: {
    buffer: false,
    __filename: true
  },
  output: {
    path: join(__dirname, '/dist/assets'),
    publicPath: '/',
    filename: '[name]_[hash].js',
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel?cacheDirectory', include: /app\/scripts/},
      {test: /\.(scss|css)$/, loader: 'style!css!postcss!sass'},
      {test: /\.(eot|woff|woff2|ttf|svg|png|jpg)($|\?)/, loader: 'file'}
    ]
  },
  postcss: [autoprefixer()],
  plugins
};

module.exports = config;

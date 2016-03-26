var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var http = require('http');
var express = require('express');
var httpProxy = require('http-proxy');
var url = require('url');

var port = 9090;
var devServerURL = `http://127.0.0.1:${port + 1}`;
var apiServerURL = 'http://127.0.0.1:9091';
var publicPath = '/dist';

var createProxyServer = function(endpointURL, ws) {
  return httpProxy.createProxyServer({
    target: endpointURL,
    ws: ws || false,
    headers: {
      host: url.parse(endpointURL).host
    }
  }).on('error', err => {
    console.info('Got error on proxy', endpointURL, err);
  });
};

var devServerProxy = createProxyServer(devServerURL, true);
var apiServerProxy = createProxyServer(apiServerURL, false);

var app = express();
app.use((req, res, next) => {
  var policies = [
    "default-src 'self' http://127.0.0.1:* ws://127.0.0.1:*",
    "script-src 'self' https://csphere.cn:* http://csphere.cn:* 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self'",
    `connect-src 'self' ws://${req.headers.host}`,
    `frame-src 'self' ${process.env.API_SERVER_URL}`
  ];
  res.set('Content-Security-Policy', policies.join('; '));
  next();
});

app.use(publicPath, (req, res) => {
  req.url = publicPath + req.url;
  devServerProxy.web(req, res);
});

app.use('/api', (req, res) => {
  req.url = `/api${req.url}`;
  apiServerProxy.web(req, res);
});

app.use('/*', (req, res) => {
  req.url = `${publicPath}/index.html`;
  devServerProxy.web(req, res);
});

var config = require('./webpack.config');
config.entry.main = [
  'webpack-dev-server/client?/',
  'webpack/hot/dev-server'
].concat(config.entry.main);

config.debug = true;
config.devtool = 'eval';
config.output.pathinfo = true;
config.output.publicPath = `${publicPath}/`;
config.plugins.push(new webpack.HotModuleReplacementPlugin());

new WebpackDevServer(webpack(config), {
  hot: true,
  quiet: true,
  publicPath: config.output.publicPath,
  stats: {colors: true}
}).listen(port + 1, '127.0.0.1');

var server = http.createServer(app);
server.on('upgrade', (req, socket, head) => {
  devServerProxy.ws(req, socket, head);
});

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.info('Running dev server on port', port);
  console.info('proxying /api/* to', apiServerURL);
});

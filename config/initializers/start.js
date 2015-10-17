require('babel/register');

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// this must be equal to your Webpack configuration "context" parameter
var project_base_path = require('path').resolve(__dirname, '../..')
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
}
else {
  // this global variable will be used later in express middleware
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
    .development(__DEVELOPMENT__)
    .server(project_base_path, function() {
      require('./server');
    });
}


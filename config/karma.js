var webpackConfig = require('./webpack/webpack.config.test');

module.exports = function(config) {
  config.set({
    browsers: ['ChromeSmall'],
    customLaunchers: {
      ChromeSmall: {
        base: 'Chrome',
        flags: [
          '--window-size=400,400',
          '--window-position=-99999,-99999'
        ]
      }
    },
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      './initializers/test.js'
    ],
    preprocessors: {
      './initializers/test.js': ['webpack', 'sourcemap', 'coverage']
    },
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : '../coverage/',
      subdir: '.'
    },
    webpack: webpackConfig,
    webpackServer: {
      quiet: true,
      noInfo: true,
      stats: {
        children: false,
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    }
  });
}

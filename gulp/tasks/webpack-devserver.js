'use strict;'

var gulp = require('gulp'),
    webpack = require('webpack'),
    devServer = require('webpack-dev-server');

var config = require('../config'),
    helpers = require('../helpers');

gulp.task('webpack-devserver', function(cb) {
  var webpackConfig = require(helpers.appdir('webpack.config.js'))
  webpackConfig.entry.app.unshift(
    "webpack-dev-server/client?http://localhost:9000",
    "webpack/hot/dev-server"
  );

  new devServer(webpack(webpackConfig), {
    contentBase: helpers.appdir('src/views'),
    hot: true,
  }).listen(9000, 'localhost', function(err, data) {
    if (err) throw new Error(err.message);
    console.log("[webpack-dev-server] "+data);
    cb();
  });
});

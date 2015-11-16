'use strict;'

var gulp = require('gulp'),
    webpack = require('webpack');

var config = require('../config'),
    helpers = require('../helpers');

gulp.task('webpack', function(cb) {
  var webpackConfig = require(helpers.appdir('webpack.config.js'))

  webpack(webpackConfig, function(err, data) {
    if (err) throw new Error(err.message);
    // FIXME: Do something with data
    cb();
  });
});

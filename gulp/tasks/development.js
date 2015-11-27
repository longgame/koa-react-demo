'use strict;'

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    webpack = require('webpack'),
    devServer = require('webpack-dev-server');

var config = require('../config'),
    helpers = require('../helpers');

gulp.task('dev', function(cb) {
  runSequence(['webpack-devserver'], cb);
});

'use strict;'

var path = require('path'),
    config = require('../config');

exports.fileIsScript = function(file) {
  return /\.jsx?$/.test(file);
};

exports.appdir = function(args) {
  return path.join(config.basedir, args);
};

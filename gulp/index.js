'use strict;'

var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp');

var helpers = require('./helpers');

module.exports = function(tasks) {
  fs.readdirSync( path.join(__dirname, 'tasks') )
    .filter( helpers.fileIsScript )
    .forEach( function(task) {
      require(path.join(__dirname, 'tasks', task));
    });

  gulp.task('default', function() {
    // FIXME
  });

  return gulp;
};

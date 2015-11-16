'use strict;'

var path = require('path'),
    webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'app/js/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /app\/.+\.(js|jsx)/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ]
  }
};

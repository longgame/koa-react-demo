'use strict;'

var path = require('path'),
    webpack = require('webpack');

module.exports = {
  entry: {
    app: [ path.resolve(__dirname, 'app/main.js') ]
  },
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 9000,
    hot: true,
    inline: true,
    progress: true,
    stats: {
    },
  },
};

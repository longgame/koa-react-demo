'use strict;'

var path = require('path'),
    webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    app: [ './main.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      { 
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader?name=assets/[name].[ext]',
      },
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

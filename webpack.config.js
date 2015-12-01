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
    publicPath: '/public/',
  },
  module: {
    loaders: [
      { 
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        // FIXME: Convert this to url-loader
        loader: 'file-loader?name=assets/[name].[ext]',
      },
      {
        test: /\.rt$/,
        loader: 'react-templates-loader',
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
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

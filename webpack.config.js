'use strict'

var path = require('path')

// var ngAnnotatePlugin = require('ng-annotate-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: './app.js',
  output: {
    path: path.join(__dirname, './bundle'),
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader?sourceMap']
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader?sourceMap', 'sass?sourceMap']
    }, {
      test: /\.less$/,
      loaders: ['style-loader', 'css-loader?sourceMap', 'less?sourceMap']
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components|lib)/,
      loader: 'babel-loader?presets[]=es2015&presets[]=stage-1'
    }, {
      test: /(.*)\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'url-loader'
    }]
  },
  resolve: {
    modules: ['node_modules']
  }
}

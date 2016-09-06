var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'input': './_build/js/m5.input.js',
    'autotag': './_build/js/m5.autotag.js'
  },
  output: {
    path: './assets/js/',
    filename: "m5.[name].js",
    libraryTarget: 'umd'
  },
  externals: {
    "m5.input": "M5Input"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};

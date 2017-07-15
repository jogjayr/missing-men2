const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const project = require('./project.config');

const __DEV__ = project.env === 'development';
const __TEST__ = project.env === 'test';
const __PROD__ = project.env === 'production';


var config = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Missing Men',
      template: './src/index.ejs'
    }),
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(project.env) },
      __DEV__,
      __TEST__,
      __PROD__,
    }, project.globals))
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: [
            'babel-plugin-transform-class-properties',
            'babel-plugin-syntax-dynamic-import',
            [
              'babel-plugin-transform-runtime',
              {
                helpers: true,
                polyfill: false, // we polyfill needed features in src/normalize.js
                regenerator: true,
              },
            ],
            [
              'babel-plugin-transform-object-rest-spread',
              {
                useBuiltIns: true // we polyfill Object.assign in src/normalize.js
              },
            ],
          ],
          presets: [
            'babel-preset-react',
            ['babel-preset-env', {
              modules: false,
              targets: {
                ie9: true,
              },
              uglify: true,
            }],
          ]
        },
      }],
    }]
  }
}


module.exports = config;

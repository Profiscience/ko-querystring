'use strict' // eslint-disable-line

const path = require('path')
const webpack = require('webpack')

module.exports = [
  makeConfig(),
  makeConfig({ minify: true })
]

function makeConfig(o) {
  const minify = o ? o.minify : false
  return {
    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: minify ? 'ko-querystring.min.js' : 'ko-querystring.js',
      library:  'ko-querystring',
      libraryTarget: 'umd'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: 'babel-loader'
        }
      ]
    },

    externals: {
      'knockout': {
        root: 'ko',
        commonjs: 'knockout',
        commonjs2: 'knockout',
        amd: 'knockout'
      }
    },

    plugins: minify
      ? [
        new webpack.optimize.UglifyJsPlugin()
      ]
      : []
  }
}

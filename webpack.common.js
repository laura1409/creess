/* eslint-disable */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const JS_DIR = path.resolve(__dirname, './src');
const JS_ASSET = path.resolve(__dirname, './assets');

const entry = {
  theme: './src/templates/index.js'
}

const output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'assets'),
};

const rules = [
  {
    test: /\.js$/,
    include: [JS_DIR, JS_ASSET],
    exclude: /node_modules/,
    use: 'babel-loader',
  },
];

module.exports = {
  entry: entry,

  output: output,

  module: {
    rules: rules,
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
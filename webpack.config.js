const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Weather App',
      meta: {
        'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' },
      },
    }),
    new MomentLocalesPlugin(),
    // new ESLintPlugin({
    //   exclude: 'node_modules',
    // }),
  ],
};

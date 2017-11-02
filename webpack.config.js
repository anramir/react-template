const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// List of libraries that must be loaded
// in the vendors.js file
const VENDOR_LIBS = [
  'react',
  'react-dom',
];


const config = {
  entry: {
    bundle: 'src/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        use: ['babel-loader', 'eslint-loader'],
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
  // Generate index.html
    new HtmlWebpackPlugin({
      title: 'React minimalist template',
      template: 'src/index.html',
      filename: 'index.html',
    }),
    // Generate source map files
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].[chunkhash].js.map',
    }),
    // Chunking
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
  ],
};

module.exports = config;

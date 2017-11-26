const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const paths = {
  SRC: path.resolve(__dirname, 'src'),
};

// List of libraries that must be loaded
// in the vendors.js file
const VENDOR_LIBS = [
  'react',
  'react-dom',
  'redux',
  'redux-saga',
  'react-redux',
];


const config = {
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
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
  devServer: {
    port: 3000,
    inline: true,
    open: true,
  },
  resolve: {
    alias: {
      components: path.resolve(paths.SRC, 'components'),
      containers: path.resolve(paths.SRC, 'containers'),
      reducers: path.resolve(paths.SRC, 'reducers'),
      actions: path.resolve(paths.SRC, 'actions'),
      sagas: path.resolve(paths.SRC, 'sagas'),
    },
  },
  devtool: 'cheap-module-source-map',
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

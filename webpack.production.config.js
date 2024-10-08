const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: (fileData) => {
      const entryName = fileData.chunk.name
      return `${entryName}.[contenthash].js`
    },
    chunkFilename: (fileData) => {
      const entryName = fileData.chunk.hash
      return `${entryName}.[contenthash].js`
    }
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
    nodeEnv: 'production',
    flagIncludedChunks: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    emitOnErrors: true,
    checkWasmTypes: true,

    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          enforce: true
        },
      }
    },
  },
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: 'styles.[contenthash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
    })
  ],
  watch: false,
  module: {
    rules: [
      {
        test: /app.*\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-transform-class-properties", "./babel-plugin-remove-metatitle"]
          }
        }]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
})

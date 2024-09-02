const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: '[name][contenthash].js',
    chunkFilename: '[name][contenthash].js'
  },
  watch: true,
  devtool : 'source-map',
  module: {
    rules: [
      {
        test: /app.*\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-transform-class-properties"]
          }
        }]
      },
      {
        test: /\.css$/,
        use: ["style-loader",'css-loader']
      }]
  }
})

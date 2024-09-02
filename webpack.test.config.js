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
    watch: false,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", 'css-loader']
            }]
    }
})
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'app': './adminApp/index.jsx',
        'vendor': [
            'react', 'redux', 'react-dom', 'react-router', 'react-router-dom', 'react-redux', 'axios', 'react-loadable', 'moment', 
            'prop-types', 'redux-form', 'redux-logger', 'redux-promise-middleware', 'redux-thunk', 'react-autosuggest', 'react-color', 
            'react-copy-to-clipboard', 'react-cropper', 'react-datetime', 'react-modal', 'react-timekeeper', 'react-widgets', 
            'recharts', 'tinymce', 'nouislider', 'react-lazy-load-image-component'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons1',
                    chunks: 'initial',
                    minChunks: 2,
                    enforce: true,
                }
            }
        },
    },
    plugins: [
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: './adminApp/template/index.html',
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: false,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'build/index.html', to: path.resolve(__dirname, 'adminApp/index.html') }
            ]
        })
    ],
    watchOptions: {
        aggregateTimeout: 100,
        poll: true,
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                loader: 'url-loader',
                dependency: { not: ['url'] },
                options: {
                    mimetype: 'image/png'
                }
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                dependency: { not: ['url'] },
                options: { limit: 100000 }
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, '/'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx'],
        alias: {
            css: 'adminApp/media/css'
        },
        fallback: {
            "crypto": require.resolve('crypto-browserify'),
        }
    }
};

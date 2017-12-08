const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry : {
        polyfills: './src/polyfills',
        vendor: './src/vendors.ts',
        app: './src/components/app/index.ts',
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: path.join(__dirname, 'tsconfig.json')
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" }, // creates style nodes from JS strings
                    { loader: "css-loader" }, // translates CSS into CommonJS
                    { loader: "sass-loader" } // compiles Sass to CSS
                ]
            }
        ]
    },

    plugins: [],
};

const path = require('path');
// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

// true if env is prod
const isProd = process.env.NODE_ENV === 'production';

// Css Compilation Configuration
const cssDev = ['style-loader', 'css-loader', 'sass-loader']
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
});
const cssConf = isProd ? cssProd : cssDev;

// path to 'src' directory
const srcPath = path.join(__dirname, 'src');

// Webpack configuration
module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        // Using hash to force Google Chrome to reload files
        filename: '[name].[hash].js'
    },
    devtool: isProd ? '' : 'source-map',
    module: {
        rules: [
            // Load .scss files with style-loader, css-loader and sass-loader
            {
                test: /\.scss$/,
                use: cssConf
            },
            // Load .js files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            // Load .pug files
            {
                test: /\.pug$/,
                use: {
                    loader: 'pug-loader'
                }
            },
            // Import fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                  'file-loader'
                ]
              },
            // Load images with file-loader | image-webpack-loader
            {
                test: /\.(jp?eg|png|gif|svg)$/i,
                loaders: [
                    'file-loader',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        // Compile index.pug file in ./src directory to 'index.html' file in build dir
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(srcPath, 'index.pug')
        }),
        // Compile saas to css and inject styles.css
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: !isProd,
            allChunks: true
        }),
        // clean 'build' directory after each build
        new CleanWebpackPlugin(['build']),
        // minify JavaScript
        new UglifyJsPlugin(),
        // Use Hot Replacement for fast reloading
        new webpack.HotModuleReplacementPlugin(),
        // Helpful for development
        new webpack.NamedModulesPlugin(),

    ],
    // devServer config, contentBase, enabling hotreloading and open file on server start
    devServer: {
        port: process.env.PORT || 3000,
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        hot: true,
        open: true
    }
};
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',

    context: path.resolve(__dirname, './src'),
    entry: {
        app: './index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },
            {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000'},
            {test: /\.(ttf|eot)(\?[\s\S]+)?$/, use: 'file-loader'},
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']}
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            title: 'React',
            favicon: '../favicon.ico'
        }),
        new ExtractTextPlugin( "bundle.css" ),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],

    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};
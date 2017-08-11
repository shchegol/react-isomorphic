global.Promise = require('bluebird');

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const environment = process.env.NODE_ENV;
const publicPath = 'http://localhost:8050/public/assets';
const cssName = environment === 'production' ? 'styles-[hash].css' : 'styles.css';
const jsName = environment === 'production' ? 'bundle-[hash].js' : 'bundle.js';
const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify(environment || 'development')
        }
    }),
    new ExtractTextPlugin(cssName),
    new webpack.LoaderOptionsPlugin({
        debug: environment !== 'production',
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
];

if (environment === 'production') {
    plugins.push(
        new CleanWebpackPlugin(['public/assets/'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: ['babel-polyfill', './client.js'],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    },
    plugins,
    output: {
        path: `${__dirname}/public/assets/`,
        filename: jsName,
        publicPath
    },
    module: {
        rules: [
            {test: /\.(html)$/, use: 'html-loader'},
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
            {test: /\.jsx?$/, exclude: [/node_modules/, /public/], use: 'babel-loader'},
            {test: /\.json$/, use: 'json-loader'},
            {test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1'},
            {test: /\.gif$/, use: 'url-loader?limit=10000&mimetype=image/gif'},
            {test: /\.jpg$/, use: 'url-loader?limit=10000&mimetype=image/jpg'},
            {test: /\.png$/, use: 'url-loader?limit=10000&mimetype=image/png'},
            {test: /\.svg/, use: 'url-loader?limit=26000&mimetype=image/svg+xml'},
        ]
    },
    devtool: environment !== 'production' ? 'source-map' : null,
    devServer: {
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' }
    }
};
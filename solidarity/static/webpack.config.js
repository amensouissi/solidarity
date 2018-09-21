/*
Once you have made changes to this file, you have to run `supervisorctl restart dev:webpack` to see the effect.
*/

var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var glob = require('glob');
var _ = require('lodash');

var general_entries = {
    bundle: ['./js/app/index'],
};

module.exports = {
    devtool: '#cheap-module-source-map',  // http://webpack.github.io/docs/configuration.html#devtool
    entry:general_entries,
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/build/'
    },
    module: {
        rules: [
        {
            test: /\.jsx?(\?v=\d)?$/,
            use: {
              loader: 'babel-loader',
              options: {
                forceEnv: 'production',  // babel default to development otherwise, this is to remove the __REACT_HOT_LOADER__ conditions in the code
                // We specify plugins and presets here to be able to transpile
                // dependencies that may have a .babelrc but doesn't do
                // an actual transpilation to ES5. The .babelrc
                // in this project is actually not used to transpile
                // dependencies if the dependency already has a .babelrc file,
                // we need plugins and presets here for that.
                // A dependency is transpiled only if it's in the include below.
                plugins: [
                  'transform-object-rest-spread',
                  'transform-class-properties',
                  'transform-react-inline-elements',
                  ['transform-runtime', { helpers: true, polyfill: false }]
                ],
                presets: [["env", { "modules": false, "targets": { "ie": 11 },
                                    "debug": true, "useBuiltIns": true,
                                    "exclude": ["web.timers", "web.immediate", "web.dom.iterable"] }],
                          "react", "flow"]
              }
            },
            include: [
              path.join(__dirname, 'js'),
            ]
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback:'style-loader',
              use: ['css-loader', 'sass-loader']})
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback:'style-loader',
              use: ['css-loader', 'sass-loader']})
        },
        {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
            use: 'file-loader?name=[name].[ext]'
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: 'graphql-tag/loader'
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
         test: /\.md$/,
         use: ['babel-loader', '@mdx-js/loader']
        }
        ]
    },
    resolve:{
        extensions:['.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new UglifyJSPlugin({ sourceMap: true, parallel: true }),
        new ExtractTextPlugin("[name].css"),
    ]
};

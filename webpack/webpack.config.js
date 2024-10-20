/** @type {import('webpack').Configuration} */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const CopyWebpackPlugin   = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    devtool: 'source-map',
    entry: `./src/js/index.js`,
    stats: {
        children: true,
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js"
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        port: 11111,
        open: true,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },


    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/style.css',
        }),
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/html/index.html`,
            filename: `${__dirname}/dist/index.html`,
            inject: 'body'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${__dirname}/src/img/`,
                    to: `${__dirname}/dist/img/`,
                }
            ]
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '70-85'
            },
            gifsicle: {
                interlaced: false,
                optimizationLevel: 9,
                colors: 256
            },
            svgo: {},
            plugins: [
                ImageminMozjpeg({
                    quality: 50,
                    progressive: true
                })
            ]
        }),
        new CleanWebpackPlugin()
    ],

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};

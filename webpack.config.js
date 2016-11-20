"use strict";

const webpack = require("webpack"),
    path = require("path"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    {
        name: "js",
        entry: "./assets/app.js",
        output: {path: __dirname + "/build", filename: "bundle.js"},
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: "babel",
                    exclude: /node_modules/,
                    query: {
                        presets: ["react", "es2015"]
                    }
                }
            ]
        },
        devServer: {
            port: 9000,
            historyApiFallback: true,
            contentBase: "./",
            hot: true
        }
    },
    {
        name: "css",
        entry: "./assets/styles/main.scss",
        output: {path: __dirname + "/build", filename: "styles.css"},
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!resolve-url!sass-loader?sourceMap")
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                },
                {
                    test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                    loader: "file-loader?name=[name].[ext]"
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("styles.css", {
                allChunks: true
            })
        ]
    }
];
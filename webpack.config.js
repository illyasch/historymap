'use strict';

module.exports = {
    entry: "./js/src/index.js",

    output: {
        path: __dirname + '/static/js',
        filename: "bundle.js",
        library: "historyMap"
    },

    devtool: "source-map",

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                },
                include: __dirname
            }
        ]
    }
}
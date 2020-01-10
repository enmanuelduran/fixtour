const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/fixtour.js',
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'fixtour.min.js',
        libraryTarget: 'commonjs2',
        library: 'Fixtour',
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            }
        ]
    },
    optimization: {
        minimize: true
    },
    target: 'node',
};



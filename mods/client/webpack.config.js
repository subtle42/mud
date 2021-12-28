const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.tsx',
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, './.dist'),
        filename: 'index_bundle.js',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        }]
    },
    devServer: {
        port: 9000,
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html'
    })],
};
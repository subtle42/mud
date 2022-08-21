import * as path from 'path'
import webpack, { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackDevServer from 'webpack-dev-server'
// import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

const config: Configuration = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './.dist'),
        filename: 'bundle.js',
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }) as any
        // new BundleAnalyzerPlugin()
    ],
}


const args = process.argv.slice(2)

if (args.includes('build')) {
    config.mode = 'production'
    webpack(config)
    .run(() => {})
} else {
    new WebpackDevServer({
        port: 9000,
        open: true
    }, webpack(config))
    .start()
}
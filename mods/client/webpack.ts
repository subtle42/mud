import * as path from 'path'
import webpack, { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackDevServer from 'webpack-dev-server'
// import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

const config: Configuration = {
    mode: 'development',
    entry: './index.tsx',
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
            template: './index.html',
        }),
        // new BundleAnalyzerPlugin()
    ],
}


const args = process.argv.slice(2)

if (args.includes('client')) {
    new WebpackDevServer({
        port: 9000,
        open: true
    }, webpack(config))
    .start()
}

if (args.includes('admin')) {
    const admin = Object.assign({}, config, {
        entry: './admin/index.tsx'
    })
     new WebpackDevServer({
        port: 9001,
        open: true,
        historyApiFallback: true
    }, webpack(admin))
    .start()
}

if (args.includes('build')) {
    config.mode = 'production'
    webpack(config)
    .run(() => {})
}
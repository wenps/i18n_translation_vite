/*
 * @Date: 2025-01-23 13:44:00
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-10 19:09:51
 * @FilePath: /i18n_translation_vite/example/webpack-vue3/webpack.config.js
 */
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
import webpackPluginsAutoI18n, { YoudaoTranslator } from 'webpack-auto-i18n-plugin'

const i18nPlugin = new webpackPluginsAutoI18n({
    option: {
        globalPath: './lang',
        namespace: 'lang',
        distPath: './dist/assets',
        distKey: 'index',
        targetLangList: ['en', 'ko', 'ja', 'ru'],
        originLang: 'zh-cn',
        translator: new YoudaoTranslator({
            appId: '4cdb9baea8066fef',
            appKey: 'ONI6AerZnGRyDqr3w7UM730mPuF8mB3j',
            proxy: {
                host: '127.0.0.1',
                port: 8899,
                protocol: 'http'
            }
        })
    }
})

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        i18nPlugin
    ],
    devServer: {
        port: 3000,
        hot: true
    }
}

/*
 * @Date: 2024-11-22 16:04:42
 * @LastEditors: xiaoshan
 * @LastEditTime: 2024-12-07 16:57:58
 * @FilePath: /i18n_translation_vite/example/vue2_webpack/vue.config.js
 */
const webpackPluginsAutoI18nCore = require('webpack-plugin-auto-i18n')
const YoudaoTranslator = webpackPluginsAutoI18nCore.YoudaoTranslator
const webpackPluginsAutoI18n = webpackPluginsAutoI18nCore.default
module.exports = {
    publicPath: 'http://localhost:9002/',
    devServer: {
        port: 9002,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    configureWebpack: {
        mode: 'development',
        plugins: [
            new webpackPluginsAutoI18n({
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
        ]
    }
}

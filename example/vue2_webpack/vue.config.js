/*
 * @Author: xiaoshanwen
 * @Date: 2024-06-25 09:59:03
 * @LastEditTime: 2024-08-16 15:37:51
 * @Description:
 * @FilePath: /i18n_translation_vite/example/vue2_webpack/vue.config.js
 */
import webpackPluginsAutoI18n, { YoudaoTranslator } from '../../webpackPluginsAutoI18n/src/index'

export * from 'auto-i18n-plugin-core'
const i18nObj = new webpackPluginsAutoI18n()
module.exports = {
    productionSourceMap: false,
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    devServer: {
        port: 8090,
        host: '0.0.0.0',
        https: false,
        open: true
    },
    configureWebpack: {
        plugins: [
            new i18nObj({
                option: {
                    globalPath: './lang',
                    namespace: 'lang',
                    distPath: './dist/assets',
                    distKey: 'index',
                    targetLangList: ['en', 'ko', 'ja'],
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

/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2024-11-18 19:10:08
 * @FilePath: /i18n_translation_vite/example/vue2/vite.config.ts
 */
import path from 'path'
import { defineConfig } from 'vite'
import vuePluginsAutoI18n, { YoudaoTranslator } from '../../vitePluginsAutoI18n/src/index'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
    resolve: {
        // 设置目录别名
        alias: {
            // 键必须以斜线开始和结束
            '@': path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
            core: path.resolve(__dirname, './src/core'),
            assets: path.resolve(__dirname, './src/assets'),
            interface: path.resolve(__dirname, './src/interface'),
            plugins: path.resolve(__dirname, './src/plugins')
        }
    },
    plugins: [
        vue(),
        vuePluginsAutoI18n({
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
                // translator: new GoogleTranslator({
                //     proxyOption: {
                //         host: '127.0.0.1',
                //         port: 8899,
                //         headers: {
                //             'User-Agent': 'Node'
                //         }
                //     }
                // })
            }
        })
    ]
})

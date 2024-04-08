/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2023-11-15 13:40:34
 * @FilePath: /i18n_translation_vite/example/vue3/vite.config.ts
 */
import path from 'path'
import { defineConfig } from 'vite'
import vuePluginsAutoI18n from 'vite-plugin-auto-i18n'
import createVuePlugin from '@vitejs/plugin-vue'

const vuePlugin = createVuePlugin({
    include: [/\.vue$/],
    template: {
        compilerOptions: {
            hoistStatic: false,
            cacheHandlers: false
        }
    }
})

const i18nPlugin = vuePluginsAutoI18n({
    option: {
        globalPath: './lang',
        namespace: 'lang',
        distPath: './dist/assets',
        distKey: 'index',
        targetLangList: ['en', 'ko', 'ja']
    }
})

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
    plugins: [vuePlugin, i18nPlugin]
})

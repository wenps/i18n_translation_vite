/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2023-11-09 19:22:23
 * @FilePath: /i18n_translation_vite/vue3Demo/vite.config.ts
 */
import path from "path";
import { defineConfig } from 'vite'
import vuePluginsAutoI18n from "vite-plugin-auto-i18n";
import createVuePlugin from '@vitejs/plugin-vue';

const vuePlugin = createVuePlugin({ include: [/\.vue$/] })

export default defineConfig({
    resolve: {  
        // 设置目录别名
        alias: {
            // 键必须以斜线开始和结束
            '@': path.resolve(__dirname, './src'),
            'components': path.resolve(__dirname, './src/components'),
            'core': path.resolve(__dirname, './src/core'),
            'assets': path.resolve(__dirname, './src/assets'),
            'interface': path.resolve(__dirname, './src/interface'),
            'plugins': path.resolve(__dirname, './src/plugins'),
        },
    },
    plugins: [
        vuePlugin,
        vuePluginsAutoI18n({
            option:{
                globalPath: './lang',
                namespace: 'lang',
                distPath: './dist/assets',
                distKey: 'index',
                langKey: ['zh-cn', 'en', 'ko'],
            }
        }),
      ]
});
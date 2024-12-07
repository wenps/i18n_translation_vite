import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vuePluginsAutoI18n from 'vite-plugin-auto-i18n'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3000,
        open: '/',
        https: false
    },
    plugins: [
        react(),
        vuePluginsAutoI18n({
            option: {
                globalPath: './lang',
                namespace: 'lang',
                distPath: './dist/assets',
                distKey: 'index',
                langKey: ['zh-cn', 'zh-tw'],
                originLang: 'en'
            }
        })
    ]
})

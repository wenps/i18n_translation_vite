/*
 * @Date: 2025-02-10 18:58:20
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-11 10:31:17
 * @FilePath: /i18n_translation_vite/example/webpack-vue3/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './LangInit/index'
import './styles/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
// element-tag-marker: 5xa94x29

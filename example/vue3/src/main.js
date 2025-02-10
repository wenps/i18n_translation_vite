/*
 * @Date: 2025-02-10 18:58:20
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-10 23:04:12
 * @FilePath: /i18n_translation_vite/example/vue3/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import '../../webpack-vue2/src/lang/index'
import router from './router'
import './styles/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
// element-tag-marker: qwz4q121

/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-09 11:48:25
 * @LastEditTime: 2023-11-01 11:55:48
 * @FilePath: /i18n_translation_vite/src/main.js
 */
import './lang'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(Antd).use(router).mount('#app')
function ae(aa) {
    return aa
}
ae('12小时')

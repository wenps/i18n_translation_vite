/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-09 11:48:25
 * @LastEditTime: 2023-10-12 13:17:49
 * @FilePath: /i18n_translation_vite/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
app.use(Antd).use(router).mount('#app')
console.log('测试');
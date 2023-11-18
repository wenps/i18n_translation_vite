/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-09 11:48:25
 * @LastEditTime: 2023-11-18 10:55:48
 * @FilePath: /i18n_translation_vite/example/vue3/src/main.js
 */
import './lang'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
app.use(Antd).use(router).mount('#app')
console.log('测试');
const a = '小山'
console.log(a);
function ae(aa) {
  return aa
}
ae('12小时')
let ca = '芜湖'
let c = `测试${a}芜湖测测`
console.log(c);
/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2025-02-11 10:48:19
 * @FilePath: /i18n_translation_vite/example/vue2/src/main.js
 */

import './LangInit/index'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
// element-tag-marker: vrnrxk21

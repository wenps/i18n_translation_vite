/*
 * @Date: 2024-11-22 16:04:42
 * @LastEditors: xiaoshan
 * @LastEditTime: 2024-12-06 18:49:34
 * @FilePath: /i18n_translation_vite/example/vue2_webpack/src/main.js
 */
import './lang/index'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

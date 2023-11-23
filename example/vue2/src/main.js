/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2023-11-23 16:12:24
 * @FilePath: /i18n_translation_vite/example/vue2/src/main.js
 */
import './lang/index'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

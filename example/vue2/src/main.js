/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2025-02-05 16:14:10
 * @FilePath: /element-tag-marker/example/vue2/src/main.ts
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(Antd);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
 // element-tag-marker: vrnrxk21
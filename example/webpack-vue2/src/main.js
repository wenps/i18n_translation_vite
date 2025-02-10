import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import antD from 'ant-design-vue"'

Vue.config.productionTip = false;
// Vue.use(antD);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
 // element-tag-marker: 12lm6029
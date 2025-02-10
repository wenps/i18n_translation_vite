/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2025-01-22 11:02:55
 * @FilePath: /element-tag-marker/example/vue2/src/router.ts
 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/products',
            name: 'products',
            component: () => import('./views/Products.vue'),
        },
        {
            path: '/solutions',
            name: 'solutions',
            component: () => import('./views/Solutions.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue'),
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('./views/Contact.vue'),
        },
    ],
});

 // element-tag-marker: 67v6b623

 // element-tag-marker: 67v6b623
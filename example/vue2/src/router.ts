/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2023-11-23 16:11:36
 * @FilePath: /i18n_translation_vite/example/vue2/src/router.ts
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})

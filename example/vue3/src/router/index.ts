/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-09 11:48:25
 * @LastEditTime: 2023-11-05 10:38:27
 * @FilePath: /i18n_translation_vite/vue3Demo/src/router/index.ts
 */

import { createRouter, createWebHistory } from 'vue-router'
export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        mate: {
            isCore: true
        }
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/test.vue'),
        mate: {
            isCore: true
        }
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})

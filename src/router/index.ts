/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-09 11:48:25
 * @LastEditTime: 2023-10-05 13:23:02
 * @FilePath: /i18n_translation_vite/src/router/index.ts
 */
import { createRouter, createWebHistory } from 'vue-router';
export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/Home.vue"),
    mate: {
        isCore: true
    }
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

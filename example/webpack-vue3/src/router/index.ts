/*
 * @Date: 2025-01-23 18:13:25
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 18:17:05
 * @FilePath: /element-tag-marker/example/webpack-vue3/src/router/index.ts
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Products from '../views/Products.vue'
import Contact from '../views/Contact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})

export default router 
 // element-tag-marker: 530p6c2h
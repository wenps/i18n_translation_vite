<!--
 * @Date: 2025-01-23 13:44:37
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 18:55:09
 * @FilePath: /element-tag-marker/example/vue3/src/App.vue
-->
<template>
  <div class="app">
    <nav class="navbar" v-bind="xx" aa="311">
      <div class="logo">FutureTech</div>
      <div class="nav-links">
        <router-link v-for="link in navLinks" 
                    :key="link.path" 
                    :to="link.path">
          {{ link.text }}
        </router-link>
      </div>
    </nav>

    <router-view></router-view>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>联系我们</h3>
          <p>电话：400-888-8888</p>
          <p>邮箱：contact@futuretech.com</p>
        </div>
        <div class="footer-section">
          <h3>关注我们</h3>
          <div class="social-links">
            <a href="#" target="_blank">微信</a>
            <a href="#" target="_blank">微博</a>
            <a href="#" target="_blank">GitHub</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 FutureTech. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const xx = ref({
  name:1312
})

const navLinks = ref([
  { path: '/', text: '首页' },
  { path: '/products', text: '产品' },
  { path: '/about', text: '关于' },
  { path: '/contact', text: '联系我们' }
])
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-links a {
  margin-left: 2rem;
  text-decoration: none;
  color: #333;
}

.nav-links a.router-link-active {
  color: #007bff;
}

.footer {
  margin-top: auto;
  background: #333;
  color: white;
  padding: 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.social-links a {
  margin-right: 1rem;
  color: white;
  text-decoration: none;
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #555;
}
</style> 
 <!-- element-tag-marker: rjyn8k21 -->
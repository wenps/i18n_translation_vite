<!--
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2025-02-06 18:06:44
 * @FilePath: /element-tag-marker/example/webpack-vue2/src/App.vue
-->
<template>
  <div   id="app">
      <div  v-bind="xx"  class="main">
          <header class="header">
              <div   class="logo">
                  <img
                      class="logo-img"
                      @click="goHome"
                      :src="logoUrl"
                      alt="Logo"
                  />
                  <span @click="goHome1" class="site-name">企业门户</span>
              </div>
              <nav class="nav-menu">
                  <a-button @click="navigate('products')" class="nav-item">产品服务</a-button>
                  <a-button @click="navigate('solutions')" class="nav-item">解决方案</a-button>
                  <a-button @click="navigate('about')" class="nav-item">关于我们</a-button>
                  <a-button @click="navigate('contact')" class="nav-item">联系我们</a-button>
              </nav>
          </header>
          <main>
              <router-view></router-view>
          </main>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          logoUrl: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
          xx: {
              name: 'element-tag-marker',
              description: 'element-tag-marker'
          }
      }
  },
  methods: {
      navigate(route) {
          this.$router.push({ name: route })
      },
      goHome1() {
          this.$router.push({ name: 'home' })
      },
      goHome() {
          this.$router.push({ name: 'about' })
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-img {
  height: 40px;
  margin-right: 1rem;
}

.site-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.nav-menu {
  display: flex;
  gap: 1rem;
}

.nav-item {
  font-weight: 500;
}

main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>

 <!-- element-tag-marker: fm3nh29 -->
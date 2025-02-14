<!--
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2025-02-14 18:05:45
 * @FilePath: /i18n_translation_vite/example/webpack-vue2/src/App.vue
-->
<template>
    <div id="app">
        <div v-bind="xx" class="main">
            <header class="header">
                <div class="logo">
                    <img class="logo-img" @click="goHome" :src="logoUrl" alt="Logo" />
                    <span @click="goHome1" class="site-name">企业门户</span>
                </div>
                <nav class="nav-menu">
                    <div class="operation" style="display: flex">
                        <div @click="changeLang('zhcn')" style="margin-right: 10px">中文</div>
                        <div @click="changeLang('en')" style="margin-right: 10px">英文</div>
                        <div @click="changeLang('ko')" style="margin-right: 10px">韩文</div>
                        <div @click="changeLang('ja')" style="margin-right: 10px">日文</div>
                    </div>
                    <div @click="navigate('products')" class="nav-item">产品服务</div>
                    <div @click="navigate('solutions')" class="nav-item">解决方案</div>
                    <div @click="navigate('about')" class="nav-item">关于我们</div>
                    <div @click="navigate('contact')" class="nav-item">联系我们</div>
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
        changeLang(value) {
            localStorage.setItem('lang', value)
            location.reload()
        },
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

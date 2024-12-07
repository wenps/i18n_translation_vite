<!--
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2024-11-18 19:06:36
 * @FilePath: /i18n_translation_vite/example/vue2/src/App.vue
-->
<template>
    <div id="app">
        <div class="main">
            <header :name="name ? '小山' : $emit('text')">
                <div class="title">
                    <img
                        class="icon"
                        @click="jump"
                        :name="name ? '小山' : $emit('text')"
                        :src="img1"
                    />
                    自动国际化插件
                </div>
                <div class="operation">
                    <a-button @click="changeLang('zhcn')" class="mr10">中文</a-button>
                    <a-button @click="changeLang('en')" class="mr10">英文</a-button>
                    <a-button @click="changeLang('ko')" class="mr10">韩文</a-button>
                    <a-button @click="changeLang('ja')" class="mr10">日文</a-button>
                </div>
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
            name: 1,
            img1: 'https://www.antdv.com/assets/logo.1ef800a8.svg'
        }
    },
    methods: {
        changeLang(value) {
            localStorage.setItem('lang', value)
            location.reload()
        },
        jump() {
            this.$router.push({
                name: 'about'
            })
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
main {
    padding: 20px;
}
</style>

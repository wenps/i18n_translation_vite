<!--
 * @Author: xiaoshanwen
 * @Date: 2023-08-11 09:56:13
 * @LastEditTime: 2024-04-03 18:01:22
 * @FilePath: /i18n_translation_vite/example/vue3/src/App.vue
-->
<template>
    <div class="main">
        <header :name="name ? '小山' : $emit('text')">
            <div class="title">
                <img
                    class="icon"
                    @click="toPath"
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
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            name: 1,
            img1: 'https://www.antdv.com/assets/logo.1ef800a8.svg'
        }
    },
    methods: {
        nameA(data: string) {
            return data
        },
        toPath() {
            this.$router.push({ name: 'test', params: { myid: this.name } })
        },
        changeLang(value: string) {
            localStorage.setItem('lang', value)
            location.reload()
        }
    }
})
</script>
<style lang="scss" scoped>
main {
    padding: 20px;
}
.main {
    width: 100vw;
    height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    header {
        width: 100%;
        height: 64px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        margin: 0;
        display: flex;
        justify-content: space-between;
        z-index: 10;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 60px;
            height: inherit;
            .icon {
                height: 32px;
                width: 32px;
                margin-right: 16px;
            }
            .name {
                color: #000000d9;
                font-size: 18px;
                font-family:
                    Avenir,
                    -apple-system,
                    BlinkMacSystemFont,
                    Segoe UI,
                    Roboto,
                    Helvetica Neue,
                    Arial,
                    Noto Sans,
                    sans-serif,
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    Segoe UI Symbol,
                    'Noto Color Emoji',
                    sans-serif;
                font-weight: 500;
            }
        }
        .operation {
            height: inherit;
            display: flex;
            align-items: center;
        }
    }
    main {
        flex: 1;
        overflow: auto;
        display: flex;
    }
    .mr10 {
        margin-right: 10px;
    }
}
</style>

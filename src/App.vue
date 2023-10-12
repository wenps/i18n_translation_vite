<!--
 * @Author: xiaoshanwen
 * @Date: 2023-08-11 09:56:13
 * @LastEditTime: 2023-10-12 13:13:38
 * @FilePath: /i18n_translation_vite/src/App.vue
-->
<template>
  <div class="main">
    <header>
      <div class="title">
        <!--测试-->
        <img src="https://www.antdv.com/assets/logo.1ef800a8.svg" class="icon"/>
        <div class="name">XiaoShan Design 小山，芜湖，不是吧 </div>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  // 测试11，333
});
</script>
<style lang="scss" scoped>
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
      .icon {
        height: 32px;
        width: 32px;
        margin-right: 16px;
      }
      .name {
        color: #000000d9;
        font-size: 18px;
        font-family: Avenir,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji",sans-serif;
        font-weight: 500;
      }
    }
  }
  main {
    flex: 1;
    display: flex;
  }
}
</style>


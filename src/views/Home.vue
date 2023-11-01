<!--
 * @Author: xiaoshanwen
 * @Date: 2023-08-09 11:48:25
 * @LastEditTime: 2023-11-01 13:53:16
 * @FilePath: /i18n_translation_vite/src/views/Home.vue
-->
<template>
  月光明媚
  测试
  {{ msg }}
  测试目的，权限
</template>
<script lang="ts" setup>
  // 验证是否会翻译注释
  import { ref } from "vue"
  const a = '小山' 
  console.log(a);
  const msg = ref('hello world')
</script>

<!--
 * @Author: xiaoshanwen
 * @Date: 2023-08-09 11:48:25
 * @LastEditTime: 2023-11-05 10:40:52
 * @FilePath: /i18n_translation_vite/vue3Demo/src/views/test.vue
-->
<template>
  <div>
  const a = '小山' 
  sadsadas, {{ a }}不是吧

  啊这
  </div>
</template>
<script lang="ts" setup>
  // 验证是否会翻译注释
  import { ref } from "vue"
  const a = '小山' 
  console.log(a);
  const msg = ref('hello world')
</script>

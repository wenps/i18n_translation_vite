<!--
 * @Author: xiaoshanwen
 * @Date: 2023-08-09 11:48:25
 * @LastEditTime: 2023-11-14 17:55:13
 * @FilePath: /i18n_translation_vite/example/vue3/src/views/Home.vue
-->
<template>
  <div>测试</div>
  月光明媚
  测试
  {{ msg }}
  测试目的，权限
  <div class="content">
    <h1>vite-plugin-auto-i18n</h1>
    <h2>介绍</h2>
    <p>基于谷歌翻译api的vite自动翻译插件，优势——无需改动源码，一键翻译</p>
    <h3>支持</h3>
    <p><em><strong>Vue2、Vue3、React</strong></em></p>
    <p><strong>支持语言：[langFile]</strong></p>
    <h2>特点</h2>
    <ul>
      <li><strong>不影响源代码（不再需要替换源代码中的i18n）。</strong></li>
      <li><strong>一键翻译.</strong></li>
      <li><strong>支持</strong> <code>js, ts, jsx, tsx</code> <strong>和其他类型文件</strong></li>
    </ul>
    <h2>使用</h2>
    <h3>安装</h3>
    <h3>配置</h3>
    <table>
      <thead>
        <tr>
          <th align="center">参数</th>
          <th align="center">类型</th>
          <th align="center">必选</th>
          <th align="center">默认值</th>
          <th align="center">描述</th>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script lang="ts" setup>
  // 验证是否会翻译注释
  import { ref } from "vue"
  const a = '小山' 
  console.log(a);
  const msg = ref('hello world')
</script>

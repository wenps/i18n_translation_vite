<template>
    <div class="content">
        <h1>vite-plugin-auto-i18n</h1>
        <h2>介绍</h2>
        <p>基于谷歌翻译api的vite自动翻译插件，优势——无需改动源码，一键翻译</p>
        <h3>支持</h3>
        <p>
            <em><strong>Vue2、Vue3、React</strong></em>
        </p>
        <p><strong>支持语言：[langFile]</strong></p>
        <h2>特点</h2>
        <ul>
            <li><strong>不影响源代码（不再需要替换源代码中的i18n）。</strong></li>
            <li><strong>一键翻译.</strong></li>
            <li>
                <strong>支持</strong>
                <code>js, ts, jsx, tsx</code>
                <strong>和其他类型文件</strong>
            </li>
        </ul>
        <h2>使用</h2>
        <h3>安装</h3>
        <pre><code class="undefinedjs">npm i vite-plugin-auto-i18n -D # yarn add vite-plugin-auto-i18n -D
    </code></pre>
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
            <tbody>
                <tr>
                    <td align="center">translateKey</td>
                    <td align="center">string</td>
                    <td align="center">❌</td>
                    <td align="center"><code>$t</code></td>
                    <td align="center">插件转换后切换语言的默认函数</td>
                </tr>
                <tr>
                    <td align="center">excludedCall</td>
                    <td align="center">string[]</td>
                    <td align="center">❌</td>
                    <td align="center">
                        <code>["$i8n", "require", "$$i8n", "console.log", "$t"]</code>
                    </td>
                    <td align="center">标记不会翻译的调用函数</td>
                </tr>
                <tr>
                    <td align="center">excludedPattern</td>
                    <td align="center">RegExp[]</td>
                    <td align="center">❌</td>
                    <td align="center"><code>[/\.\w+$/]</code></td>
                    <td align="center">标记不会翻译的字符串</td>
                </tr>
                <tr>
                    <td align="center">excludedPath</td>
                    <td align="center">RegExp[]</td>
                    <td align="center">❌</td>
                    <td align="center"><code>[]</code></td>
                    <td align="center">不翻译指定目录下文件</td>
                </tr>
                <tr>
                    <td align="center">includePath</td>
                    <td align="center">RegExp[]</td>
                    <td align="center">❌</td>
                    <td align="center"><code>[/src\//]</code></td>
                    <td align="center">翻译指定目录下文件</td>
                </tr>
                <tr>
                    <td align="center">globalPath</td>
                    <td align="center">string</td>
                    <td align="center">❌</td>
                    <td align="center"><code>./lang</code></td>
                    <td align="center">翻译配置文件生成位置</td>
                </tr>
                <tr>
                    <td align="center">distPath</td>
                    <td align="center">string</td>
                    <td align="center">✅</td>
                    <td align="center"><code>''</code></td>
                    <td align="center">
                        打包后生成文件的位置 比如 ./dist/assets
                        <br />
                        （
                        <code>用于将翻译配置注入打包文件</code>
                        ）
                    </td>
                </tr>
                <tr>
                    <td align="center">distKey</td>
                    <td align="center">string</td>
                    <td align="center">✅</td>
                    <td align="center"><code>''</code></td>
                    <td align="center">
                        打包后生成文件的主文件名称，比如index.xxx 默认是index
                        <br />
                        （
                        <code>用于将翻译配置注入打包文件</code>
                        ）
                    </td>
                </tr>
                <tr>
                    <td align="center">namespace</td>
                    <td align="center">string</td>
                    <td align="center">✅</td>
                    <td align="center"><code>''</code></td>
                    <td align="center">线上区分当前项目间的翻译配置</td>
                </tr>
                <tr>
                    <td align="center">originLang</td>
                    <td align="center">string</td>
                    <td align="center">❌</td>
                    <td align="center"><code>'zh-cn'</code></td>
                    <td align="center">源语言（基于该语言翻译成其他语言）</td>
                </tr>
                <tr>
                    <td align="center">targetLangList</td>
                    <td align="center">string[]</td>
                    <td align="center">❌</td>
                    <td align="center"><code>['en']</code></td>
                    <td align="center">
                        目标语言（原始语言将被翻译成的语言类型，接受一个数组，支持多种语言）
                        <br />
                        支持语言类型（[langFile]）
                    </td>
                </tr>
                <tr>
                    <td align="center">buildToDist</td>
                    <td align="center">Boolean</td>
                    <td align="center">❌</td>
                    <td align="center"><code>false</code></td>
                    <td align="center">是否将翻译配置打包到主包中</td>
                </tr>
            </tbody>
        </table>
        <p>
            为什么需要
            <strong>buildToDist</strong>
            ?
        </p>
        <p>
            <code>
                在vite环境中执行插件后，只生成翻译配置文件。如果您直接构建它，项目将生成翻译配置文件。但翻译配置文件不会立即打包到主包中，您可能需要再次打包。
            </code>
        </p>
        <p>
            <code>因此，提供了buildToDist选项，当创建翻译配置文件时，它将主动将</code>
            翻译配置文件打包进
            <code>主包，缺陷是您的打包文件可能有两份翻译配置文件</code>
        </p>
        <h3>配置演示</h3>
        <pre><code class="undefinedjs">
import vitePluginAutoI18n from "../vitePluginAutoI18n/src/index";
import createVuePlugin from '@vitejs/plugin-vue';
const vuePlugin = createVuePlugin({ include: [/\.vue$/] })
export default defineConfig({
  plugins: [
    vuePlugin,
    vitePluginAutoI18n({
      option: {
        globalPath: './lang',
        namespace: 'lang',
        distPath: './dist/assets',
        distKey: 'index'
      }
    })
  ]
});
    </code></pre>
        <h3>main.js</h3>
        <pre><code class="undefinedjs">import './lang' //  必须在项目的入口文件第一行引入lang文件
    </code></pre>
        <h3>lang file</h3>
        <h4>演示配置lang文件</h4>
        <pre><code class="undefinedjs">import '../../lang/index'
import EN from '../../lang/en/index.mjs'
import CN from '../../lang/zh-cn/index.mjs'
const langMap = {
  en: window?.lang?.en || EN,
  zhcn: window?.lang?.zhcn || CN
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], 'lang')
    </code></pre>
        <h4>演示介绍</h4>
        <pre><code class="undefinedjs">
      import CN from '../../[your globalPath]/[your originLangKey]/index.mjs'
      // 这里只演示了targetLangList长度为零的情况，如果有多种语言就继续往下加
      import EN from '../../[your globalPath]/[your targetLangList[0]]/index.mjs'
      const langMap = {
        [your originLangKey]: window?.[your namespace]?.[your originLangKey] || CN,
        [your targetLangList[0]]: window?.[your namespace]?.[your targetLangList[0]] || EN
      }
      // window.localStorage.getItem('lang') Storing the current language type
      const lang = window.localStorage.getItem('lang') || [your originLangKey](defualt lang),
      window.[your translateKey].locale(langMap[lang], [your namespace])
    </code></pre>
    </div>
</template>
<script lang="ts" setup></script>
<style>
.content {
    display: flex;
    flex-direction: column;
    text-align: left;
}
pre {
    display: contents !important;
}
</style>

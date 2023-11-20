# vite-plugin-auto-i18n

## 介绍

基于谷歌翻译api的vite自动翻译插件，优势——无需改动源码，一键翻译

### 支持

***Vue2、Vue3、React***

**支持语言：[langFile](./language.js)**

demo项目地址：[demo](https://github.com/wenps/vitePluginAutoI18nDemo)

## 特点

* **不影响源代码（不再需要替换源代码中的i18n）。**
* **一键翻译.**
* **支持** `js, ts, jsx, tsx` **和其他类型文件**

## 使用

### 安装

```
npm i vite-plugin-auto-i18n -D # yarn add vite-plugin-auto-i18n -D
```

### 配置

|      参数      |   类型   | 必选 |                        默认值                        |                                                       描述                                                       |
| :-------------: | :------: | :--: | :---------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: |
|  translateKey  |  string  |  ❌  |                        `$t`                        |                                           插件转换后切换语言的默认函数                                           |
|  excludedCall  | string[] |  ❌  | `["$i8n", "require", "$$i8n", "console.log", "$t"]` |                                              标记不会翻译的调用函数                                              |
| excludedPattern | RegExp[] |  ❌  |                    `[/\.\w+$/]`                    |                                               标记不会翻译的字符串                                               |
|  excludedPath  | RegExp[] |  ❌  |                        `[]`                        |                                               不翻译指定目录下文件                                               |
|   includePath   | RegExp[] |  ❌  |                     `[/src\//]`                     |                                                翻译指定目录下文件                                                |
|   globalPath   |  string  |  ❌  |                      `./lang`                      |                                               翻译配置文件生成位置                                               |
|    distPath    |  string  |  ✅  |                        `''`                        |                 打包后生成文件的位置 比如 ./dist/assets<br />（`用于将翻译配置注入打包文件`）                 |
|     distKey     |  string  |  ✅  |                        `''`                        |          打包后生成文件的主文件名称，比如index.xxx 默认是index<br />（`用于将翻译配置注入打包文件`）          |
|    namespace    |  string  |  ✅  |                        `''`                        |                                           线上区分当前项目间的翻译配置                                           |
|   originLang   |  string  |  ❌  |                      `'zh-cn'`                      |                                 源语言（基于该语言翻译成其他语言，目前只有zhcn）                                 |
| targetLangList | string[] |  ❌  |                      `['en']`                      | 目标语言（原始语言将被翻译成的语言类型，接受一个数组，支持多种语言）<br />支持语言类型（[langFile](./language.js)） |
|   buildToDist   | Boolean |  ❌  |                       `false`                       |                                            是否将翻译配置打包到主包中                                            |

为什么需要 **buildToDist**?

`在vite环境中执行插件后，只生成翻译配置文件。如果您直接构建它，项目将生成翻译配置文件。但翻译配置文件不会立即打包到主包中，您可能需要再次打包。`

`因此，提供了buildToDist选项，当创建翻译配置文件时，它将主动将`翻译配置文件打包进 `主包，缺陷是您的打包文件可能有两份翻译配置文件`

### 配置演示

```
import vitePluginAutoI18n from "../vitePluginAutoI18n/src/index";
import createVuePlugin from '@vitejs/plugin-vue';
const vuePlugin = createVuePlugin({
    include: [/\.vue$/],
    // 注意这个配置必须加上，为了防止插件解析的时候创建静态的节点，解析得不到节点中的文字
    template: {
        compilerOptions: {
            hoistStatic: false,
            cacheHandlers: false,
        }
    } 
})

export default defineConfig({
    plugins: [
        vuePlugin,
        vitePluginAutoI18n({
            option:{
                globalPath: './lang',
                namespace: 'lang',
                distPath: './dist/assets',
                distKey: 'index'
            }
        }),
      ]
});
```

### main.js

```
import './lang' //  必须在项目的入口文件第一行引入lang文件
```

### lang file

#### 演示配置lang文件

```
import '../../lang/index'
import langJSON from '../../lang/index.json'
const langMap = {
    en: window?.lang?.en || _getJSONKey('en', langJSON),
    zhcn: window?.lang?.zhcn || _getJSONKey('zhcn', langJSON
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], 'lang')
```

#### 演示介绍

```import
import '../../lang/index' // 导入翻译基础函数
import langJSON from '../../lang/index.json // 导入翻译对象json
const langMap = {
    {{ your originLangKey }}: window?.{{ your namespace }}?.{{ your originLangKey } || _getJSONKey('zhcn', langJSON)
    {{ your targetLangList[0] }}: window?.{{ your namespace }}?.{{ your targetLangList[0] } || _getJSONKey('en', langJSON),
}
// window.localStorage.getItem('lang') Storing the current language type
const lang = window.localStorage.getItem('lang') || {{ your originLangKey }}(defualt lang)
window.{{ your translateKey }}.locale(langMap[lang], {{ your namespace }})
```

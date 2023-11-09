# vite-plugin-auto-i18n

## Introduction

vite auto-translation plugin based on Google api, not intrusive to the source code.

### Support

***Vue2、Vue3、React***

**support language：[langFile](./language.js)**

## Specificities

* **Not intrusive to the source code（No more need to replace i18n in the source code）.**
* **Fully automatic translation.**
* **Support**  `js, ts, jsx, tsx` **and other types of files**

## Usage

### Install

```
npm i vite-plugin-auto-i18n -D # yarn add vite-plugin-auto-i18n -D
```

### Option

|    parameter    | typology | required field |                    default valueco                    |                                                                                descriptions                                                                                |
| :-------------: | :------: | :------------: | :---------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  translateKey  |  string  |       ❌       |                        `$t`                        |                                                      Default function for switching languages after plugin conversion                                                      |
|  excludedCall  | string[] |       ❌       | `["$i8n", "require", "$$i8n", "console.log", "$t"]` |                                                               Marking does not translate the calling function                                                               |
| excludedPattern | RegExp[] |       ❌       |                    `[/\.\w+$/]`                    |                                                                     Marking strings without translation                                                                     |
|  excludedPath  | RegExp[] |       ❌       |                        `[]`                        |                                                       Specify a directory of files that do not need to be translated                                                       |
|   includePath   | RegExp[] |       ❌       |                     `[/src\//]`                     |                                                             Specify the directory of the files to be translated                                                             |
|   globalPath   |  string  |       ❌       |                      `./lang`                      |                                                                   Translation profile generation location                                                                   |
|    distPath    |  string  |       ✅       |                        `''`                        |             The location of the generated files after packaging e.g. . /dist/assets<br />（`Used to inject translation configurations into packaged files`）             |
|     distKey     |  string  |       ✅       |                        `''`                        | The name of the main file of the generated file after packaging, e.g. index.xxx Default is index<br />（`Used to inject translation configurations into packaged files`） |
|    namespace    |  string  |       ✅       |                        `''`                        |                                               Indicates the location of the translation configuration for the current project                                               |
|     langKey     | string[] |       ❌       |                  `['zh-cn', 'en']`                  |                       Language key for requesting Google api and generating content files for the corresponding language under the configuration file                       |

### config

```
import vitePluginAutoI18n from "../vitePluginAutoI18n/src/index";
import createVuePlugin from '@vitejs/plugin-vue';
const vuePlugin = createVuePlugin({ include: [/\.vue$/] })

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
import './lang' // The first line of the entry file introduces the automatic translation configuration file
```

### lang file

#### Example

```
import '../../lang/index'
import EN from '../../lang/en/index.mjs'
import CN from '../../lang/zh-cn/index.mjs'
const langMap = {
    en: window?.lang?.en || EN,
    zhcn: window?.lang?.zhcn || CN
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], 'lang')
```

#### Explanation

```
import '../../{{ your globalPath }}/index'
import EN from '../../{{ your globalPath }/{{ your langKey[1] }}/index.mjs'
import CN from '../../{{ your globalPath }/{{ your langKey[0] }/index.mjs'
const langMap = {
    {{ your langKey[1] }}: window?.{{ your namespace }}?.{{ your langKey[1] } || EN,
    {{ your langKey[0] }}: window?.{{ your namespace }}?.{{ your langKey[0] } || CN
}
// window.localStorage.getItem('lang') Storing the current language type
const lang = window.localStorage.getItem('lang') || {{ your langKey[0] }}(defualt lang)
window.{{ your translateKey }}.locale(langMap[lang], {{ your namespace }})
```

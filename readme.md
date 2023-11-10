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

|     parameter     | typology | required field |                    default valueco                    |                                                                                                 descriptions                                                                                                 |
| :---------------: | :------: | :------------: | :---------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   translateKey   |  string  |       ❌       |                        `$t`                        |                                                                       Default function for switching languages after plugin conversion                                                                       |
|   excludedCall   | string[] |       ❌       | `["$i8n", "require", "$$i8n", "console.log", "$t"]` |                                                                                Marking does not translate the calling function                                                                                |
|  excludedPattern  | RegExp[] |       ❌       |                    `[/\.\w+$/]`                    |                                                                                      Marking strings without translation                                                                                      |
|   excludedPath   | RegExp[] |       ❌       |                        `[]`                        |                                                                        Specify a directory of files that do not need to be translated                                                                        |
|    includePath    | RegExp[] |       ❌       |                     `[/src\//]`                     |                                                                              Specify the directory of the files to be translated                                                                              |
|    globalPath    |  string  |       ❌       |                      `./lang`                      |                                                                                    Translation profile generation location                                                                                    |
|     distPath     |  string  |       ✅       |                        `''`                        |                              The location of the generated files after packaging e.g. . /dist/assets<br />（`Used to inject translation configurations into packaged files`）                              |
|      distKey      |  string  |       ✅       |                        `''`                        |                  The name of the main file of the generated file after packaging, e.g. index.xxx Default is index<br />（`Used to inject translation configurations into packaged files`）                  |
|     namespace     |  string  |       ✅       |                        `''`                        |                                                                Indicates the location of the translation configuration for the current project                                                                |
|   originLangKey   |  string  |       ❌       |                      `'zh-cn'`                      |                                                                  source language（Translations into other languages based on that language）                                                                  |
| targetLangKeyList | string[] |       ❌       |                      `['en']`                      | target language（The type of language that the original language will be translated into, passed into an array to support multiple languages at once）<br />support target language（[langFile](./language.js)） |
|    buildToDist    | Boolean |       ❌       |                       `false`                       |                                                                  Whether to package the translation configuration into the main package.（）                                                                  |

why need **buildToDist**?

`After executing the plugin in the vite environment, the translation configuration file is just generated. If you directly build it, the project will generate the translation configuration file. However, the translation configuration file will not be packaged into the main package immediately, and you may need to package it a second time. Therefore, the buildToDist option is provided, and when the translation configuration file is created, it will be actively set to the main package, The flaw is that your packaged file may have two sets of translation configuration files.`

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
import CN from '../../{{ your globalPath }/{{ your originLangKey }/index.mjs'
// if your targetLangKeyList length is zero, Otherwise, by analogy, write the targetLangKeyList with the other items.
import EN from '../../{{ your globalPath }/{{ your targetLangKeyList[0] }}/index.mjs' 
const langMap = {
    {{ your originLangKey }}: window?.{{ your namespace }}?.{{ your originLangKey } || CN
    {{ your targetLangKeyList[0] }}: window?.{{ your namespace }}?.{{ your targetLangKeyList[0] } || EN,
}
// window.localStorage.getItem('lang') Storing the current language type
const lang = window.localStorage.getItem('lang') || {{ your originLangKey }}(defualt lang)
window.{{ your translateKey }}.locale(langMap[lang], {{ your namespace }})
```

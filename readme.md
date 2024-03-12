# vite-plugin-auto-i18n

## Introduction

vite auto-translation plugin based on Google api, not intrusive to the source code.

### Support

***Vue2、Vue3、React***

**support language：[langFile](./language.js)**

**demo project address**：[demo](https://github.com/wenps/vitePluginAutoI18nDemo)

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

|    parameter    | typology | required field |                     default value                     |                                                                                                 descriptions                                                                                                 |
| :-------------: | :------: | :------------: | :---------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  translateKey  |  string  |       ❌       |                        `$t`                        |                                                                       Default function for switching languages after plugin conversion                                                                       |
|  excludedCall  | string[] |       ❌       | `["$i8n", "require", "$$i8n", "console.log", "$t"]` |                                                                                Marking does not translate the calling function                                                                                |
| excludedPattern | RegExp[] |       ❌       |                    `[/\.\w+$/]`                    |                                                                                      Marking strings without translation                                                                                      |
|  excludedPath  | RegExp[] |       ❌       |                        `[]`                        |                                                                        Specify a directory of files that do not need to be translated                                                                        |
|   includePath   | RegExp[] |       ❌       |                     `[/src\//]`                     |                                                                              Specify the directory of the files to be translated                                                                              |
|   globalPath   |  string  |       ❌       |                      `./lang`                      |                                                                                    Translation profile generation location                                                                                    |
|    distPath    |  string  |       ✅       |                        `''`                        |                              The location of the generated files after packaging e.g. . /dist/assets<br />（`Used to inject translation configurations into packaged files`）                              |
|     distKey     |  string  |       ✅       |                        `''`                        |                  The name of the main file of the generated file after packaging, e.g. index.xxx Default is index<br />（`Used to inject translation configurations into packaged files`）                  |
|    namespace    |  string  |       ✅       |                        `''`                        |                                                                    Distinguish translation configurations between current projects online                                                                    |
|   originLang   |  string  |       ❌       |                      `'zh-cn'`                      |                                                                  source language（Translations into other languages based on that language）                                                                  |
| targetLangList | string[] |       ❌       |                      `['en']`                      | target language（The type of language that the original language will be translated into, passed into an array to support multiple languages at once）<br />support target language（[langFile](./language.js)） |
|   buildToDist   | Boolean |       ❌       |                       `false`                       |                                                                  Whether to package the translation configuration into the main package.（）                                                                  |
|      post      |  number  |       ❌       |                       `7890`                       |                 To access the translation API, a proxy tool is required, so it is necessary to ensure that the proxy port and the request port are consistent. The default port here is 7890.                 |

why need **buildToDist**?

`After executing the plugin in the vite environment, the translation configuration file is just generated. If you directly build it, the project will generate the translation configuration file. However, the translation configuration file will not be packaged into the main package immediately, and you may need to package it a second time. Therefore, the buildToDist option is provided, and when the translation configuration file is created, it will be actively set to the main package, The flaw is that your packaged file may have two sets of translation configuration files.`

How to **update translations**？

`After executing the plugin, two files will be generated under globalPath, ` `index.js and index.json , index.js generates the relevant translation functions, while index.json is the json file that stores all the translation sources, if you want to update the translation content, you can directly update this json file. `

### Translation

* **The plugin requires a VPN/proxy tool to be used because it needs to invoke the Google Translate API. In the future, support for the Youdao Translate API will be added, but users will need to provide their own API key.**
* **If the translation fails, please check if the current proxy port is set to 7890 because the plugin defaults to using port 7890 for requests. Starting from version 0.0.10, it will be possible to configure the port number.**
* **Google Translate is a free translation service, so frequent requests may result in reaching the request limit. In such cases, it is recommended to wait for a few hours before making further requests.**

### config

```
import vitePluginAutoI18n from "../vitePluginAutoI18n/src/index";
import createVuePlugin from '@vitejs/plugin-vue';
const vuePlugin = createVuePlugin({
    include: [/\.vue$/],
    // Note that this configuration must be added to prevent the plugin from creating static nodes when parsing and not getting the text in the nodes
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
import './lang' // The first line of the entry file introduces the automatic translation configuration file
```

### lang file

#### Example

```
import '../../lang/index'
import langJSON from '../../lang/index.json
const langMap = {
    en: window?.lang?.en || _getJSONKey('en', langJSON),
    zhcn: window?.lang?.zhcn || _getJSONKey('zhcn', langJSON)
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], 'lang')
```

#### Explanation

```
import '../../{{ your globalPath }}/index' // Import translation base function
import langJSON from '../../{{ your globalPath }}/index.json' // Import translation target JSON
const langMap = {
    {{ your originLangKey }}: window?.{{ your namespace }}?.{{ your originLangKey } ||  _getJSONKey('zhcn', langJSON)
    {{ your targetLangList[0] }}: window?.{{ your namespace }}?.{{ your targetLangList[0] } ||  _getJSONKey('en', langJSON),
}
// window.localStorage.getItem('lang') Storing the current language type
const lang = window.localStorage.getItem('lang') || {{ your originLangKey }}(defualt lang)
window.{{ your translateKey }}.locale(langMap[lang], {{ your namespace }})
```

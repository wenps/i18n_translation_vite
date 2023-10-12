/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2023-10-12 13:29:14
 * @FilePath: /i18n_translation_vite/src/plugins/vuePluginsAutoi18n.ts
 */
const babel = require("@babel/core");
const compilerSFC = require('@vue/compiler-sfc')
import { hasChineseSymbols, removeComments } from './utils/base'
import { initLangFile } from './utils/file';

let langObj = ''

export default function vuePluginsAutoi18n() {
  langObj = initLangFile()
  return {
    name: 'vue-plugins-auto-i18n',
    transform(code:string, path:string) {
      // 处理ts || js || jsx || vue 文件
      if (path.endsWith('.ts') || path.endsWith('.js')|| path.endsWith('.jsx')) {
        if(!hasChineseSymbols(code)) return code;
        code = removeComments(code)
        try {
          let result = babel.transformSync(code, {
            configFile: false,
            plugins: [plugin],
          });
          return result.code;
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}

const plugin = function (api:any, config:any) {
  return {
    visitor: {
      StringLiteral: (path:any)=>{console.log(path)},
      JSXText: (path:any)=>{console.log(path)},
      TemplateElement: (path:any)=>{console.log(path)},
      CallExpression: (path:any)=>{console.log(path)},
    },
  };
};
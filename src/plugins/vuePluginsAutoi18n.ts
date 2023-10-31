/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2023-10-31 10:57:22
 * @FilePath: /i18n_translation_vite/src/plugins/vuePluginsAutoi18n.ts
 */
const babel = require("@babel/core");
import {optionInfo, initOption} from './option'
import { fileUtils, translateUtils, baseUtils } from './utils';
import filter from './filter';

export default function vuePluginsAutoI18n(option: optionInfo) {
  translateUtils.initLangObj(fileUtils.initLangFile())
  initOption(option)
  return {
    name: 'vue-plugins-auto-i18n',
    transform(code:string, path:string) {
      // 处理ts || js || jsx || vue 文件
      if (path.endsWith('.vue') || path.endsWith('.ts') || path.endsWith('.js')|| path.endsWith('.jsx')) {
        if(!baseUtils.hasChineseSymbols(baseUtils.unicodeToChinese(code))) return code;
        code = baseUtils.removeComments(code)
        try {
          let result = babel.transformSync(code, {
            configFile: false,
            plugins: [filter],
          });
          return result.code;
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}

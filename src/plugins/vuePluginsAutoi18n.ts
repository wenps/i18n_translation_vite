/*
 * @Author: 小山
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2023-11-02 19:03:44
 * @FilePath: /i18n_translation_vite/src/plugins/vuePluginsAutoi18n.ts
 */
import {optionInfo, initOption, option} from './option'
import { fileUtils, translateUtils, baseUtils } from './utils';
import filter from './filter';
const babel = require("@babel/core");

export default function vuePluginsAutoI18n(optionInfo: optionInfo) {
  initOption(optionInfo)
  translateUtils.initLangObj(fileUtils.initLangFile(option.globalPath)[option.langKey[0]])
  return {
    name: 'vue-plugins-auto-i18n',
    async transform(code:string, path:string) {
      // 处理ts || js || jsx || vue 文件
      if (path.endsWith('.vue') || path.endsWith('.ts') || path.endsWith('.js')|| path.endsWith('.jsx')) {
        if(!baseUtils.hasChineseSymbols(baseUtils.unicodeToChinese(code))) return code;
        try {
          let result = babel.transformSync(code, {
            configFile: false,
            plugins: [filter],
          });
          await translateUtils.googleAutoTranslate()
          return result.code;
        } catch (e) {
          console.error(e);
        }
      }
    },
    async buildEnd() {
      console.info('构建阶段批量翻译')
      await translateUtils.googleAutoTranslate()
    }
  }
}

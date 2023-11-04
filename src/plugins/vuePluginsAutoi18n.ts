/*
 * @Author: 小山
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2023-11-04 16:17:13
 * @FilePath: /i18n_translation_vite/src/plugins/vuePluginsAutoi18n.ts
 */
import { optionInfo, initOption, option } from './option';
import { fileUtils, translateUtils, baseUtils } from './utils';
import filter from './filter';

const babel = require("@babel/core");
const allowedExtensions = ['.vue', '.ts', '.js', '.tsx', '.jsx'];

export default function vuePluginsAutoI18n(optionInfo: optionInfo) {
  initOption(optionInfo);
  fileUtils.initLangFile();
  translateUtils.initLangObj(fileUtils.getLangObjByJSONFileWithLangKey(option.langKey[0]));

  return {
    name: 'vue-plugins-auto-i18n',
    async transform(code: string, path: string) {
      if (allowedExtensions.some(ext => path.endsWith(ext))) {
        if (!baseUtils.hasChineseSymbols(baseUtils.unicodeToChinese(code))) return code;
        if (option.includePath.length && !baseUtils.checkAgainstRegexArray(path, option.includePath)) return code;
        if (option.excludedPath.length && baseUtils.checkAgainstRegexArray(path, option.excludedPath)) return code;
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
      console.info('构建阶段批量翻译');
      await translateUtils.googleAutoTranslate();
    },
    async closeBundle() {
      // 翻译配置写入主文件
      await fileUtils.buildSetLangConfigToIndexFile();
    }
  };
}
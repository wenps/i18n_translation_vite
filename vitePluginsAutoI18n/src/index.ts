/*
 * @Author: 小山
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2023-11-10 09:16:36
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/index.ts
 */
import { optionInfo, initOption, option } from './option';
import { fileUtils, translateUtils, baseUtils } from './utils';
import filter from './filter';
import * as babel from '@babel/core';

const allowedExtensions = ['.vue', '.ts', '.js', '.tsx', '.jsx'];

export default function vitePluginsAutoI18n(optionInfo: optionInfo) {
  initOption(optionInfo);
  fileUtils.initLangFile();
  translateUtils.initLangObj(fileUtils.getLangObjByJSONFileWithLangKey(option.langKey[0]));

  return {
    name: 'vite-plugin-auto-i18n',
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
          return result?.code;
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
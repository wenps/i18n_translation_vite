/*
 * @Author: 小山
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2023-11-13 18:47:35
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/index.ts
 */
import { optionInfo, option, initOption,checkOption } from './option';
import { fileUtils, translateUtils, baseUtils } from './utils';
import filter from './filter';
import * as babel from '@babel/core';

const allowedExtensions = ['.vue', '.ts', '.js', '.tsx', '.jsx'];

export default function vitePluginsAutoI18n(optionInfo: optionInfo) {
  initOption(optionInfo);
  // 这里ts类型要适配
  if(!checkOption()) return {} as any
  fileUtils.initLangFile();
  const originLangObj = fileUtils.getLangObjByJSONFileWithLangKey(option.langKey[0])
  translateUtils.languageConfigCompletion(originLangObj)
  translateUtils.initLangObj(originLangObj);

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
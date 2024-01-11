/*
 * @Author: 小山
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2023-11-15 10:23:16
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/index.ts
 */
import { optionInfo, option, initOption,checkOption } from './option';
import { fileUtils, translateUtils, baseUtils, FunctionFactoryOption } from './utils';
import filter from './filter';
import * as babel from '@babel/core';
import { ResolvedConfig} from 'vite'

const allowedExtensions = ['.vue', '.ts', '.js', '.tsx', '.jsx'];

export default function vitePluginsAutoI18n(optionInfo: optionInfo) {
  let config: ResolvedConfig;

  initOption(optionInfo);
  // 这里ts类型要适配
  if(!checkOption()) return {} as any
  fileUtils.initLangFile();
  const originLangObj = fileUtils.getLangObjByJSONFileWithLangKey(option.originLang)
  translateUtils.languageConfigCompletion(originLangObj)
  translateUtils.initLangObj(originLangObj);

  return {
    name: 'vite-plugin-auto-i18n',
    configResolved(resolvedConfig: ResolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig
    },
    async transform(code: string, path: string) {
      if (allowedExtensions.some(ext => path.endsWith(ext))) {
        // @TODOS 调试先注释，记得做适配
        // if (!baseUtils.hasChineseSymbols(baseUtils.unicodeToChinese(code))) return code;
        if (option.includePath.length && !baseUtils.checkAgainstRegexArray(path, option.includePath)) return code;
        if (option.excludedPath.length && baseUtils.checkAgainstRegexArray(path, option.excludedPath)) return code;
        
        FunctionFactoryOption.originLang = option.originLang;
        
        try {
          let result = babel.transformSync(code, {
            configFile: false,
            plugins: [filter],
          });
          if (config.command === 'serve') {
            console.log(222);
            
            await translateUtils.googleAutoTranslate()
          } 
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
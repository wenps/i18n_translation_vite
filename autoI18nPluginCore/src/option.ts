/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-26 17:34:47
 * @LastEditTime: 2024-04-07 18:16:10
 * @FilePath: /i18n_translation_vite/autoI18nPluginCore/src/option.ts
 */

import { YouDaoOriginLangKeyEnum, GoogleOriginLangKeyEnum, TranslateApiEnum } from "./enums";

const DEFAULT_OPTION = {
  translateKey: "$t",
  /** 标记不翻译调用函数 */
  excludedCall: ["$i8n", "require", "$$i8n", "console.log", "$t"],
  /** 标记不用翻译字符串 */
  excludedPattern: [/\.\w+$/],
  /** 排查不需要翻译的目录下的文件  */
  excludedPath: [] as string[],
  /** 指定需要翻译的目录下的文件 */
  includePath: [/src\//],
  /** 配置文件生成位置 */
  globalPath: './lang',
  /** 打包后生成文件的位置 比如 ./dist/assets */
  distPath: '',
  /** 打包后生成文件的主文件名称，比如index.xxx 默认是index */
  distKey: 'index',
  /** 来源语言 */
  originLang: GoogleOriginLangKeyEnum.ZH as GoogleOriginLangKeyEnum | YouDaoOriginLangKeyEnum | string,
  /** 翻译目标语言 */
  targetLangList: ['en'],
  /** 语言key，用于请求谷歌api和生成配置文件下对应语言的内容文件 */
  langKey: [] as string[],
  /** 命名空间 */
  namespace: '',
  /** 是否构建结束之后将最新的翻译重新打包到主包中 */
  buildToDist: false,
  /** 代理端口 */
  post: 7890,
  /** 翻译类型 */
  translate: TranslateApiEnum.google,
  /** 有道应用Id */
  youdaoAppId: '',
  /** 有道应用Key */
  youdaoAppKey: ''
}

type OptionType = typeof DEFAULT_OPTION

export let option: OptionType = { ...DEFAULT_OPTION };

export type optionInfo = {
  option: Partial<OptionType>;
}

export function initOption(optionInfo: optionInfo) {
  option = { ...DEFAULT_OPTION, ...optionInfo.option };
  option.langKey = [ option.originLang, ...option.targetLangList ]
}

export function checkOption() {
  if(!option.namespace) {
    console.error('❌请配置命名空间')
    return false
  }
  if(option.buildToDist && !option.distKey) {
    console.log('❌请配置打包后生成文件的主文件名称')
    return false
  }
  if(option.buildToDist && !option.distPath) {
    console.log('❌请配置打包后生成文件的位置')
    return false
  }
  if(!option.originLang) {
    console.error('❌请配置来源语言')
    return false
  }
  if(!option.targetLangList || !option.targetLangList.length) {
    console.error('❌请配置目标翻译语言数组')
    return false
  }
  return true
}
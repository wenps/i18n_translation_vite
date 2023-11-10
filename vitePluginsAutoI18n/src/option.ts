/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-26 17:34:47
 * @LastEditTime: 2023-11-10 17:19:10
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/option.ts
 */

const OPTION = {
  translateKey: "$t",
  excludedCall: ["$i8n", "require", "$$i8n", "console.log", "$t"],
  excludedPattern: [/\.\w+$/],
  excludedPath: [],
  includePath: [/src\//],
  globalPath: './lang',
  distPath: '',
  distKey: 'index',
  originLang: 'zh-cn',
  targetLangList: ['en'],
  langKey: [],
  namespace: '',
  buildToDist: false
}

type OptionType = {
  translateKey: string,
  excludedCall: string[], // 标记不翻译调用函数
  excludedPattern: RegExp[], // 标记不用翻译字符串
  excludedPath: RegExp[], // 排查不需要翻译的目录下的文件
  includePath: RegExp[], // 指定需要翻译的目录下的文件
  globalPath: string, // 配置文件生成位置
  originLang: string, // 来源语言
  targetLangList: string[], // 翻译目标语言
  langKey: string[], // 语言key，用于请求谷歌api和生成配置文件下对应语言的内容文件
  namespace: string, // 命名空间
  buildToDist: Boolean, // 是否构建结束之后将最新的翻译重新打包到主包中
  distPath: string, // 打包后生成文件的位置 比如 ./dist/assets
  distKey: string, // 打包后生成文件的主文件名称，比如index.xxx 默认是index
};

export let option: OptionType = { ...OPTION };

export type optionInfo = {
  option: Partial<OptionType>;
}

export function initOption(optionInfo: optionInfo) {
  option = { ...OPTION, ...optionInfo.option };
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
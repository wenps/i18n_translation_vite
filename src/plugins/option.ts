/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-26 17:34:47
 * @LastEditTime: 2023-10-31 15:31:53
 * @FilePath: /i18n_translation_vite/src/plugins/option.ts
 */
const OPTION = {
  translateKey: "$t",
  // 排除不需要国际化配置的调用方法
  excludedCall: ["$i8n", "require", "$$i8n", "console.log", "$t"] as string[], // translateKey('key','value') 标记不翻译字符 
  // 排除不需要配置的字符串，
  excludedPattern: [/\.\w+$/] as RegExp[], // 默认文件名
  globalPath: './lang',
  langKey: ['zh-cn', 'en']
}

type OptionType = typeof OPTION;

export let option: OptionType= {
  translateKey: "$t",
  excludedCall: [],
  excludedPattern: [],
  globalPath: '',
  langKey: []
}

export type optionInfo = {
  option: OptionType
}
export function initOption(optionInfo: optionInfo) {
  option = OPTION
}
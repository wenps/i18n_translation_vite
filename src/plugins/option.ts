/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-26 17:34:47
 * @LastEditTime: 2023-11-02 17:34:24
 * @FilePath: /i18n_translation_vite/src/plugins/option.ts
 */

const OPTION = {
  translateKey: "$t",
  excludedCall: ["$i8n", "require", "$$i8n", "console.log", "$t"],
  excludedPattern: [/\.\w+$/],
  globalPath: './lang',
  langKey: ['zh-cn', 'en'],
  namespace: ''
}

type OptionType = {
  translateKey: string,
  // 排除不需要国际化配置的调用方法
  excludedCall: string[], // 标记不翻译调用函数
  excludedPattern: RegExp[], // 标记不用翻译字符串
  globalPath: string,
  langKey: string[],
  namespace: string
};

export let option: OptionType = { ...OPTION };

export type optionInfo = {
  option: Partial<OptionType>;
}

export function initOption(optionInfo: optionInfo) {
  option = { ...OPTION, ...optionInfo.option };
}
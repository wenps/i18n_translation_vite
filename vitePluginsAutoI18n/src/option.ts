/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-26 17:34:47
 * @LastEditTime: 2023-11-04 15:08:47
 * @FilePath: /i18n_translation_vite/src/plugins/option.ts
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
  langKey: ['zh-cn', 'en'],
  namespace: ''
}

type OptionType = {
  translateKey: string,
  excludedCall: string[], // 标记不翻译调用函数
  excludedPattern: RegExp[], // 标记不用翻译字符串
  excludedPath: RegExp[], // 排查不需要翻译的目录下的文件
  includePath: RegExp[], // 指定需要翻译的目录下的文件
  globalPath: string, // 配置文件生成位置
  originLang: string, // 来源语言
  langKey: string[], // 语言key，用于请求谷歌api和生成配置文件下对应语言的内容文件
  namespace: string, // 命名空间
  distPath: string, // 打包后生成文件的位置 比如 ./dist/assets
  distKey: string, // 打包后生成文件的主文件名称，比如index.xxx 默认是index
};

export let option: OptionType = { ...OPTION };

export type optionInfo = {
  option: Partial<OptionType>;
}

export function initOption(optionInfo: optionInfo) {
  option = { ...OPTION, ...optionInfo.option };
}
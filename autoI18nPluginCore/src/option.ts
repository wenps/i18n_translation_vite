/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-26 17:34:47
 * @LastEditTime: 2024-12-07 16:39:02
 * @FilePath: /i18n_translation_vite/autoI18nPluginCore/src/option.ts
 */

import cloneDeep from 'lodash/cloneDeep'
import { OriginLangKeyEnum } from './enums'
import { YoudaoTranslator, GoogleTranslator, Translator, TranslatorOption } from './translator'
export { YoudaoTranslator, GoogleTranslator, Translator }
export type { TranslatorOption }

const DEFAULT_OPTION = {
    /** 翻译调用函数 */
    translateKey: '$t',
    /** 标记不翻译调用函数 */
    excludedCall: ['$i8n', 'require', '$$i8n', 'console.log', '$t'],
    /** 标记不用翻译字符串 */
    excludedPattern: [/\.\w+$/],
    /** 排查不需要翻译的目录下的文件（白名单）  */
    excludedPath: [] as string[],
    /** 指定需要翻译的目录下的文件（黑名单） */
    includePath: [/src\//],
    /** 配置文件生成位置 */
    globalPath: './lang',
    /** 打包后生成文件的位置 比如 ./dist/assets */
    distPath: '',
    /** 打包后生成文件的主文件名称，比如index.xxx 默认是index */
    distKey: 'index',
    /** 来源语言 */
    originLang: OriginLangKeyEnum.ZH as OriginLangKeyEnum | string,
    /** 翻译目标语言 */
    targetLangList: ['en'],
    /** 语言key，用于请求谷歌api和生成配置文件下对应语言的内容文件 */
    langKey: [] as string[],
    /** 命名空间 */
    namespace: '',
    /** 是否构建结束之后将最新的翻译重新打包到主包中 */
    buildToDist: false,
    /** 翻译器 */
    translator: new GoogleTranslator({
        proxyOption: {
            port: 7890,
            host: '127.0.0.1',
            headers: {
                'User-Agent': 'Node'
            }
        }
    }) as Translator,
    /** 翻译器配置，优先级低于translator */
    translatorOption: undefined as TranslatorOption | undefined
}

type OptionType = typeof DEFAULT_OPTION

export let option: OptionType = { ...DEFAULT_OPTION }

export type OptionInfo = {
    option: Partial<OptionType> // TODO: 没有区分必填项与非必填项
}

function generateUserOption(optionInfo: OptionInfo) {
    // 一些对用户传入的option的前置处理写在这里
    const userOption = cloneDeep(optionInfo.option)
    userOption.translator ||= userOption.translatorOption
        ? new Translator(userOption.translatorOption)
        : undefined
    if (!userOption.translator) delete userOption.translator
    return userOption
}

export function initOption(optionInfo: OptionInfo) {
    option = { ...DEFAULT_OPTION, ...generateUserOption(optionInfo) }
    option.langKey = [option.originLang, ...option.targetLangList]
}

export function checkOption() {
    if (!option.translateKey) {
        console.error('❌请配置翻译调用函数')
        return false
    }
    if (!option.namespace) {
        console.error('❌请配置命名空间')
        return false
    }
    if (option.buildToDist && !option.distKey) {
        console.log('❌请配置打包后生成文件的主文件名称')
        return false
    }
    if (option.buildToDist && !option.distPath) {
        console.log('❌请配置打包后生成文件的位置')
        return false
    }
    if (!option.originLang) {
        console.error('❌请配置来源语言')
        return false
    }
    if (!option.targetLangList || !option.targetLangList.length) {
        console.error('❌请配置目标翻译语言数组')
        return false
    }
    return true
}

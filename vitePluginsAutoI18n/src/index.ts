/*
 * @Author: 小山
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2024-04-06 17:05:08
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/index.ts
 */
import {
    filter,
    fileUtils,
    translateUtils,
    baseUtils,
    FunctionFactoryOption,
    OptionInfo,
    option,
    initOption,
    checkOption
} from 'auto-i18n-plugin-core'
import * as babel from '@babel/core'
import { ResolvedConfig, Plugin } from 'vite'
export * from 'auto-i18n-plugin-core'

const allowedExtensions = ['.vue', '.ts', '.js', '.tsx', '.jsx']

export default function vitePluginsAutoI18n(optionInfo: OptionInfo): any {
    const name = 'vite-plugin-auto-i18n'
    let config: ResolvedConfig

    initOption(optionInfo)

    if (!checkOption()) return { name }
    fileUtils.initLangFile()
    const originLangObj = fileUtils.getLangObjByJSONFileWithLangKey(option.originLang)
    translateUtils.languageConfigCompletion(originLangObj)
    translateUtils.initLangObj(originLangObj)
    const plugin: Plugin = {
        name,
        configResolved(resolvedConfig) {
            // 存储最终解析的配置
            config = resolvedConfig
        },
        async transform(code: string, path: string) {
            if (allowedExtensions.some(ext => path.endsWith(ext))) {
                // @TODOS 调试先注释，记得做适配
                // if (!baseUtils.hasChineseSymbols(baseUtils.unicodeToChinese(code))) return code;
                if (
                    option.includePath.length &&
                    !baseUtils.checkAgainstRegexArray(path, option.includePath)
                )
                    return code
                if (
                    option.excludedPath.length &&
                    baseUtils.checkAgainstRegexArray(path, option.excludedPath)
                )
                    return code

                FunctionFactoryOption.originLang = option.originLang

                try {
                    let result = babel.transformSync(code, {
                        configFile: false,
                        plugins: [filter.default]
                    })
                    if (config.command === 'serve') {
                        await translateUtils.autoTranslate()
                    }
                    return result?.code
                } catch (e) {
                    console.error(e)
                }
            }
        },
        async buildEnd() {
            console.info('构建阶段批量翻译')
            await translateUtils.autoTranslate()
        },
        async closeBundle() {
            // 翻译配置写入主文件
            await fileUtils.buildSetLangConfigToIndexFile()
        }
    }

    return plugin
}

/*
 * @Author: xiaoshanwen
 * @Date: 2024-03-01 11:27:03
 * @LastEditTime: 2024-11-22 18:05:31
 * @FilePath: /i18n_translation_vite/webpackPluginsAutoI18n/src/index.ts
 */
import webpack from 'webpack'
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

export * from 'auto-i18n-plugin-core'

const allowedExtensions = ['.vue', '.ts', '.js', '.tsx', '.jsx']

export default class webpackPluginsAutoI18n {
    constructor(optionInfo: OptionInfo) {
        console.log(optionInfo)
        initOption(optionInfo)

        if (!checkOption()) return
        fileUtils.initLangFile()
        const originLangObj = fileUtils.getLangObjByJSONFileWithLangKey(option.originLang)
        translateUtils.languageConfigCompletion(originLangObj)
        translateUtils.initLangObj(originLangObj)
    }
    apply(compiler: webpack.Compiler) {
        compiler.hooks.compilation.tap(
            'webpackPluginsAutoI18n',
            (compilation: webpack.Compilation) => {
                // chunk优化完的回调解析js
                compilation.hooks.optimizeChunkAssets.tapAsync(
                    'webpackPluginsAutoI18n',
                    (chunks: Set<webpack.Chunk>, callback: (err?: Error) => void) => {
                        chunks.forEach(chunk => {
                            chunk.files.forEach(async file => {
                                // if (allowedExtensions.some(ext => file.endsWith(ext))) {
                                //     // @TODOS 调试先注释，记得做适配
                                //     // if (!baseUtils.hasChineseSymbols(baseUtils.unicodeToChinese(code))) return code;
                                //     if (
                                //         option.includePath.length &&
                                //         !baseUtils.checkAgainstRegexArray(file, option.includePath)
                                //     )
                                //         return code
                                //     if (
                                //         option.excludedPath.length &&
                                //         baseUtils.checkAgainstRegexArray(file, option.excludedPath)
                                //     )
                                //         return code
                                //     FunctionFactoryOption.originLang = option.originLang
                                //     try {
                                //         let result = babel.transformSync(code, {
                                //             configFile: false,
                                //             plugins: [filter.default]
                                //         })
                                //         if (config.command === 'serve') {
                                //             await translateUtils.autoTranslate()
                                //         }
                                //         return result?.code
                                //     } catch (e) {
                                //         console.error(e)
                                //     }
                                // }
                            })
                        })
                        callback()
                    }
                )
            }
        )
    }
}

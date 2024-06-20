/*
 * @Author: 小山
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2024-06-20 19:21:09
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
import fs from 'fs'

const allowedExtensions = ['.vue', '.ts', '.js', '.tsx', '.jsx']

export default function vitePluginsAutoI18n(optionInfo: OptionInfo): any {
    const name = 'vite-plugin-auto-i18n'
    let config: ResolvedConfig
    let disabled = true
    let tempDir = ''

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
            if (process.argv.includes('i18n')) {
                disabled = false
                config.build.outDir = tempDir = `dist/vite-i18n-output_${+new Date()}`
            }
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
                        if (disabled) return result?.code
                        await translateUtils.autoTranslate()
                    }
                    return result?.code
                } catch (e) {
                    console.error(e)
                }
            }
        },
        async buildEnd() {
            if (disabled) return
            console.info('构建阶段批量翻译')
            await translateUtils.autoTranslate()
        },
        async closeBundle() {
            if (disabled) return
            // 翻译配置写入主文件
            await fileUtils.buildSetLangConfigToIndexFile()
            await new Promise(resolve => setTimeout(resolve, 1000)) // 等待文件夹解除锁定
            fs.readdirSync(tempDir, { recursive: true })
            console.info('翻译完成✔')
        }
    }

    return plugin
}

/*
 * @Author: xiaoshanwen
 * @Date: 2024-03-01 11:27:03
 * @LastEditTime: 2024-12-09 10:16:07
 * @FilePath: /i18n_translation_vite/webpackPluginsAutoI18n/src/index.ts
 */
import webpack from 'webpack'
import {
    fileUtils,
    translateUtils,
    OptionInfo,
    option,
    initOption,
    checkOption
} from 'auto-i18n-plugin-core'
import path from 'path'

export * from 'auto-i18n-plugin-core'

const allowedExtensions = ['.vue', '.ts', '.js', '.tsx', '.jsx']

// 生成基础后缀正则
function generateFileExtensionRegex(extensions: string[]) {
    // 将扩展名数组转换为正则表达式字符串
    const regexString = extensions.map(ext => ext.replace('.', '\\.')).join('|')
    // 返回完整的正则表达式
    return new RegExp(`\(${regexString})$`)
}

export default class webpackPluginsAutoI18n {
    constructor(optionInfo: OptionInfo) {
        initOption(optionInfo)

        // 检查配置项
        if (!checkOption()) return
        fileUtils.initLangFile()
        const originLangObj = fileUtils.getLangObjByJSONFileWithLangKey(option.originLang)
        translateUtils.languageConfigCompletion(originLangObj)
        translateUtils.initLangObj(originLangObj)
    }
    apply(compiler: webpack.Compiler) {
        compiler.hooks.beforeCompile.tapAsync('webpackPluginsAutoI18n', (_params, callback) => {
            // 添加自定义 loader 到 Webpack 配置
            if (compiler.options.module.rules) {
                compiler.options.module.rules.push({
                    // loader 只能处理js 因此这里需要作为后置loader进行插入
                    test: generateFileExtensionRegex(allowedExtensions),
                    enforce: 'post', // 后置loader
                    use: [
                        {
                            // 基于loader批量收集目标翻译内容
                            loader: path.resolve(__dirname, './Loader/index.cjs')
                        }
                    ]
                })
            }
            callback()
        })
        // 构建阶段 批量翻译
        compiler.hooks.emit.tap('webpackPluginsAutoI18n', async _compilation => {
            console.info('构建阶段批量翻译')
            await translateUtils.autoTranslate()
            // todo 暂不支持写入到主文件，webpack 感觉并不需要
            console.info('翻译完成✔')
        })
    }
}

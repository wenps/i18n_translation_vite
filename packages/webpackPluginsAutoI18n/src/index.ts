/*
 * @Author: xiaoshanwen
 * @Date: 2024-03-01 11:27:03
 * @LastEditTime: 2025-02-11 11:02:39
 * @FilePath: /i18n_translation_vite/packages/webpackPluginsAutoI18n/src/index.ts
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

// 导出核心模块中的工具和类型
export * from 'auto-i18n-plugin-core'

/**
 * 允许处理的文件扩展名列表。
 * 如果只处理 `.js` 文件，可能会有遗漏。
 * 因此需要结合用户的配置，只处理特定目录内的指定文件类型。
 */
const allowedExtensions = ['.vue', '.tsx', '.jsx', '.js', '.ts']

/**
 * Webpack 插件实现，用于自动化处理国际化翻译功能。
 */
export default class webpackPluginsAutoI18n {
    /**
     * 初始化插件并合并用户配置
     * @param optionInfo 用户提供的配置
     */
    constructor(optionInfo: OptionInfo) {
        // 初始化插件配置
        initOption(optionInfo)

        // 检查配置有效性，如果无效则不执行后续逻辑
        if (!checkOption()) return

        // 初始化语言文件
        fileUtils.initLangFile()

        // 获取来源语言内容对象
        const originLangObj = fileUtils.getLangObjByJSONFileWithLangKey(option.originLang)

        // 补全语言配置，确保来源语言文件的内容完整性
        translateUtils.languageConfigCompletion(originLangObj)

        // 初始化翻译对象（用于翻译操作）
        translateUtils.initLangObj(originLangObj)
    }

    /**
     * Webpack 插件核心方法，用于集成到编译流程中。
     * @param compiler Webpack 编译器实例
     */
    apply(compiler: webpack.Compiler) {
        /**
         * 在编译前阶段动态添加自定义 Loader。
         */
        compiler.hooks.beforeCompile.tapAsync('webpackPluginsAutoI18n', (_params, callback) => {
            // 检查是否已经添加过这个自定义 Loader，避免重复添加
            const hasCustomLoader = (rule: any) =>
                rule.use &&
                Array.isArray(rule.use) &&
                rule.use.some(({ loader }: { loader: string }) => {
                    loader && loader.includes('customLoader/index.cjs')
                })

            // 如果尚未添加自定义 Loader，则动态将其添加到配置中
            if (
                compiler.options.module.rules &&
                !compiler.options.module.rules.some(hasCustomLoader)
            ) {
                // 添加自定义 Loader 到 Webpack 配置，并设为后置 Loader
                compiler.options.module.rules.push({
                    test: generateAdvancedRegex(allowedExtensions), // 匹配指定扩展名
                    enforce: 'post', // 后置 Loader，确保其他 Loader 处理完后运行
                    use: [
                        {
                            // 自定义 Loader：批量收集翻译内容
                            loader: path.resolve(__dirname, './customLoader/index.cjs')
                        }
                    ]
                })
            }
            callback()
        })

        /**
         * 在构建阶段执行翻译任务。
         */
        compiler.hooks.emit.tap('webpackPluginsAutoI18n', async _compilation => {
            console.info('构建阶段批量翻译')

            // 批量翻译核心逻辑，使用工具类自动翻译用户内容
            await translateUtils.autoTranslate()

            // 当前不支持将翻译内容写入主文件（暂不实现）
            console.info('翻译完成✔')
        })
    }
}

/**
 * 动态生成一个正则表达式，用于匹配目标文件。
 *
 * 验证以下条件：
 *  - 文件名需以特定的扩展名结尾（如 `.vue`, `.ts` 等）
 *  - 必须满足 `option.includePath` 中的至少一个短语或正则表达式；
 *  - 不能满足 `option.excludedPath` 中的任何短语或正则表达式。
 *
 * @param extensions 文件扩展名数组 (如: ['.vue', '.tsx', '.jsx', '.js', '.ts'])
 * @returns 匹配文件的动态生成正则表达式
 */
function generateAdvancedRegex(extensions: string[]): RegExp {
    // 转义扩展名列表，如 '.vue' 转为 '\.vue'，形成正则表达式
    const extensionsRegex = `(${extensions.map(ext => ext.replace('.', '\\.')).join('|')})$`

    /**
     * Helper 函数：将短语（字符串或正则）转化为正则表达式。
     */
    function phraseToRegex(phrase: string | RegExp): string {
        if (phrase instanceof RegExp) {
            // 如果是正则表达式，直接取其 source
            return phrase.source
        }
        // 如果是字符串，对特殊字符进行转义
        return phrase.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    }

    // 获取用户配置的路径过滤
    const includePhrases = option.includePath
    const excludePhrases = option.excludedPath

    // 构造 "包含匹配" 的正则：确保文件路径至少匹配一个 includePath 规则
    const includeRegex = includePhrases.length
        ? `(?=.*(${includePhrases.map(phraseToRegex).join('|')}))`
        : ''

    // 构造 "排除匹配" 的正则：确保文件路径不匹配任何 excludePath 规则
    const excludeRegex = excludePhrases.length
        ? `^(?!.*(${excludePhrases.map(phraseToRegex).join('|')}))`
        : ''

    // 最终拼接规则：必须满足 includeRegex，且不匹配 excludeRegex
    const finalRegex = `${excludeRegex}${includeRegex}.*${extensionsRegex}`

    // 返回正则对象，不区分大小写
    return new RegExp(finalRegex, 'i')
}

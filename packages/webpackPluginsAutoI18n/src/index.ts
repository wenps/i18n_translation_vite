// plugin.ts
import webpack from 'webpack' // 从 webpack 导入核心接口
import {
    fileUtils,
    translateUtils,
    OptionInfo,
    option,
    initOption,
    checkOption,
    FunctionFactoryOption
} from 'auto-i18n-plugin-core' // 导入 auto-i18n-plugin-core 提供的工具和类型
import path from 'path' // 导入 path 模块，用于处理文件和目录路径

export * from 'auto-i18n-plugin-core' // 重新导出 auto-i18n-plugin-core 内容

/**
 * 允许处理的文件扩展名列表。
 * 如果只处理 `.js` 文件，可能会有遗漏。
 * 因此需要结合用户的配置，只处理特定目录内的指定文件类型。
 */
const allowedExtensions = ['.vue', '.tsx', '.jsx', '.js', '.ts']

/**
 * Webpack 插件实现，用于自动化处理国际化翻译功能
 */
export default class webpackPluginsAutoI18n {
    /**
     * 初始化插件并合并用户配置
     * @param optionInfo 用户提供的配置
     */
    constructor(optionInfo: OptionInfo) {
        initOption(optionInfo) // 初始化插件配置

        if (!checkOption()) return // 检查配置有效性，如果无效则不执行后续逻辑

        fileUtils.initLangFile() // 初始化语言文件
        // 获取来源语言内容对象

        const originLangObj = fileUtils.getLangObjByJSONFileWithLangKey(option.originLang)
        // 补全语言配置，确保来源语言文件的内容完整性
        translateUtils.languageConfigCompletion(originLangObj)
        // 初始化翻译对象（用于翻译操作）
        translateUtils.initLangObj(originLangObj)
        FunctionFactoryOption.originLang = option.originLang // 配置初始语言选项，将来源语言设置为配置的 originLang
    }

    /**
     * Webpack 插件核心方法，用于集成到编译流程中
     * @param compiler Webpack 编译器实例
     */
    apply(compiler: webpack.Compiler) {
        /**
         * 在编译前阶段动态添加自定义 Loader
         */
        compiler.hooks.emit.tap('webpackPluginsAutoI18n', () => {
            // 检查是否已经添加过这个自定义 Loader，避免重复添加
            const hasCustomLoader = (rule: any) =>
                rule.use &&
                Array.isArray(rule.use) &&
                rule.use.some(
                    ({ loader }: { loader: string }) =>
                        loader && loader.includes('customLoader/index.cjs')
                )

            // 如果尚未添加自定义 Loader，则动态将其添加到配置中
            if (
                compiler.options.module?.rules &&
                !compiler.options.module.rules.some(hasCustomLoader)
            ) {
                // 添加自定义 Loader 到 Webpack 配置，并设为后置 Loader
                compiler.options.module.rules.push({
                    test: generateAdvancedRegex(allowedExtensions), // 匹配指定扩展名
                    enforce: 'post', // 后置 Loader，确保其他 Loader 处理完后运行
                    use: [
                        {
                            loader: path.resolve(__dirname, './customLoader/index.cjs') // 自定义 Loader：批量收集翻译内容
                        }
                    ]
                })
            }
        })

        /**
         * 在构建阶段执行翻译任务
         */
        compiler.hooks.emit.tapPromise('webpackPluginsAutoI18n', async _compilation => {
            console.info('构建阶段批量翻译')
            await translateUtils.autoTranslate()
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
    const extensionsRegex = `(${extensions.map(ext => ext.replace('.', '\\.')).join('|')})$`

    /**
     * 将短语（字符串或正则）转化为正则表达式
     * @param phrase 包含字符串或正则的短语
     * @returns 短语对应的正则表达式
     */
    function phraseToRegex(phrase: string | RegExp): string {
        if (phrase instanceof RegExp) {
            return phrase.source
        }
        return phrase.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    }

    const includePhrases = option.includePath // 获取用户配置的包含路径
    const excludePhrases = option.excludedPath // 获取用户配置的排除路径

    const includeRegex = includePhrases.length
        ? `(?=.*(${includePhrases.map(phraseToRegex).join('|')}))`
        : ''

    const excludeRegex = excludePhrases.length
        ? `^(?!.*(${excludePhrases.map(phraseToRegex).join('|')}))`
        : ''

    const finalRegex = `${excludeRegex}${includeRegex}.*${extensionsRegex}`
    return new RegExp(finalRegex, 'i')
}

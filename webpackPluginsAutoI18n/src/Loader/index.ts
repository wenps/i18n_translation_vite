import { LoaderContext } from 'webpack'
import * as core from 'auto-i18n-plugin-core'
import * as babel from '@babel/core'
/**
 * @description: 默认参数类型
 * @return {*}
 */
type option = {
    [key: string]: any
}

module.exports = function (source): string {
    // 获取核心插件配置及函数
    const { baseUtils, option, FunctionFactoryOption, filter } = core
    // 获取全局实例
    const global = this as unknown as LoaderContext<option>

    if (
        option.includePath.length &&
        !baseUtils.checkAgainstRegexArray(global.resourcePath, option.includePath)
    )
        return source
    if (
        option.excludedPath.length &&
        baseUtils.checkAgainstRegexArray(global.resourcePath, option.excludedPath)
    )
        return source

    // 设置
    FunctionFactoryOption.originLang = option.originLang

    try {
        let result = babel.transformSync(source, {
            configFile: false,
            plugins: [filter.default]
        })

        return result?.code || ''
    } catch (e) {
        console.error(e)
    }
    return source
}

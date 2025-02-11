/*
 * @Date: 2025-01-08 11:51:33
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-11 10:10:14
 * @FilePath: /i18n_translation_vite/packages/webpackPluginsAutoI18n/src/Loader/index.ts
 */
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
/**
 * @description: 核心loader 作用是过滤代码的目标语言，生成基础国际化key——value映射
 * @param {*} source
 * @return {*}
 */
module.exports = function (source): string {
    // 获取核心插件配置及函数
    const { baseUtils, option, FunctionFactoryOption, filter } = core
    // 获取全局实例
    const global = this as unknown as LoaderContext<option>

    // 黑白名单过滤
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

    FunctionFactoryOption.originLang = option.originLang

    try {
        // 过滤代码语言
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

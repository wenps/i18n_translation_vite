/*
 * @Date: 2025-01-08 11:51:33
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-11 11:01:12
 * @FilePath: /i18n_translation_vite/packages/webpackPluginsAutoI18n/src/customLoader/index.ts
 */

import { LoaderContext } from 'webpack' // 从 Webpack 导入 LoaderContext 类型，用于上下文类型定义
import * as core from 'auto-i18n-plugin-core' // 导入核心处理逻辑（国际化相关功能）
import * as babel from '@babel/core' // 导入 Babel，用于在 Loader 中处理并转换代码

/**
 * @description: Loader 配置参数类型定义
 * @example:
 * - 可以通过 Webpack 配置文件或插件传递的参数对象
 * - 参数类型较为宽泛，可根据实际需求扩展字段
 */
type option = {
    [key: string]: any // 任意键值对，用于传递 Loader 配置参数
}

/**
 * @description: 核心 Loader，用于解析和处理代码，将目标语言提取为国际化的 key-value 映射
 * @param source {string} - 源代码字符串，需要经过当前 Loader 处理的模块内容
 * @returns {string} - 返回经过处理后的代码
 */
module.exports = function (source): string {
    // 从核心模块中解构出工具函数、选项以及过滤逻辑
    const { baseUtils, option, FunctionFactoryOption, filter } = core

    // 获取 Webpack 的 Loader 上下文，方便访问文件路径及其他相关信息
    const global = this as unknown as LoaderContext<option>

    /**
     * 黑白名单过滤：
     * - 首先检查是否在 `includePath` 白名单内；如果不在白名单内直接返回原代码。
     * - 然后检查是否在 `excludedPath` 黑名单内；如果在黑名单内则返回原代码。
     */
    if (
        option.includePath.length &&
        !baseUtils.checkAgainstRegexArray(global.resourcePath, option.includePath)
    ) {
        return source // 不在白名单目录中的文件，不处理，直接返回原始代码。
    }

    if (
        option.excludedPath.length &&
        baseUtils.checkAgainstRegexArray(global.resourcePath, option.excludedPath)
    ) {
        return source // 在黑名单目录中的文件，不处理，直接返回原始代码。
    }

    // 配置初始语言选项，将来源语言设置为配置的 originLang
    FunctionFactoryOption.originLang = option.originLang

    try {
        /**
         * 使用 Babel 对代码进行分析和转换：
         * - 通过设置 Babel 的 `transformSync` 方法，可以在当前代码中调用核心模块的过滤逻辑。
         * - `filter.default` 是一个 Babel 插件，用于只提取内容中符合目标语言的部分。
         * - `configFile: false` 表示不加载外部的 Babel 配置文件。
         */
        let result = babel.transformSync(source, {
            configFile: false, // 不加载本地 Babel 配置文件
            plugins: [filter.default] // 使用核心模块提供的 `filter` 插件
        })

        // 如果转换成功，返回转换后的代码；否则返回空字符串。
        return result?.code || ''
    } catch (e) {
        // 捕捉和打印异常，保证整个构建过程不会中断
        console.error(e)
    }

    // 如果在过滤或转换过程中发生异常，返回原始未改动的代码
    return source
}

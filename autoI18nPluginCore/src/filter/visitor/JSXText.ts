/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-01 16:35:38
 * @LastEditTime: 2023-11-14 18:24:20
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/filter/visitor/JSXText.ts
 */
import * as types from '@babel/types'
import { baseUtils } from '../../utils'
import { option } from '../../option'

export default function (path: any) {
    console.log('jsx text')

    let { node } = path
    let value = node.value
    // 当前jsxText是否包含中文，是否包含过滤字段
    if (
        baseUtils.hasOriginSymbols(value) &&
        option.excludedPattern.length &&
        !baseUtils.checkAgainstRegexArray(value, [...option.excludedPattern])
    ) {
        // 生成翻译节点
        let expression = baseUtils.createI18nTranslator(value, true)
        // 生成的翻译节点包装在  types.JSXExpressionContainer  中
        let newNode = types.jSXExpressionContainer(expression)
        // 使用  path.replaceWith  方法将原来的节点替换为新的翻译节点
        path.replaceWith(newNode)
    }
}

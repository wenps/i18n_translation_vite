/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:18:51
 * @LastEditTime: 2025-02-14 10:33:39
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/filter/visitor/CallExpression.ts
 */
import types from '@babel/types'
import { translateUtils } from '../../utils/index'
import { option } from '../../option'

// 收集翻译对象
export default function (path: any) {
    let { node } = path
    if (node.callee.name === option.translateKey) {
        let arg = node.arguments || []
        const id = arg[0]?.value || ''
        const value = arg[1]?.value || ''
        if (id && value && types.isStringLiteral(arg[1])) {
            translateUtils.setLangObj(id, value)
        }
    }
}

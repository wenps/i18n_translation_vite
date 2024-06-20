/*
 * @Author: xiaoshanwen
 * @Date: 2024-03-01 11:27:03
 * @LastEditTime: 2024-06-20 18:50:52
 * @FilePath: /i18n_translation_vite/webpackPluginsAutoI18n/src/index.ts
 */
import { OptionInfo } from 'auto-i18n-plugin-core'

export default class webpackPluginsAutoI18n {
    optionInfo: OptionInfo
    constructor(optionInfo: OptionInfo) {
        this.optionInfo = optionInfo
    }
    apply(compiler) {}
}

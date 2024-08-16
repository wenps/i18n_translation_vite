/*
 * @Author: xiaoshanwen
 * @Date: 2024-03-01 11:27:03
 * @LastEditTime: 2024-08-16 15:25:53
 * @FilePath: /i18n_translation_vite/webpackPluginsAutoI18n/src/index.ts
 */
import { OptionInfo } from 'auto-i18n-plugin-core'

export default class webpackPluginsAutoI18n {
    optionInfo: OptionInfo
    constructor(optionInfo: OptionInfo) {
        this.optionInfo = optionInfo
    }
    apply(compiler: any) {
        console.log(compiler)
        console.log(this.optionInfo)
    }
}

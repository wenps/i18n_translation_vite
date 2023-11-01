/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 13:08:36
 * @LastEditTime: 2023-11-01 11:29:50
 * @FilePath: /i18n_translation_vite/src/lang/index.js
 */
import '../../lang/index'
import EN from '../../lang/en/index.mjs'
import CN from '../../lang/zh-cn/index.mjs'
const langMap = {
    en: EN,
    zhcn: CN
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], '')
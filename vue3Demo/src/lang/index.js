/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 13:08:36
 * @LastEditTime: 2023-11-09 19:23:16
 * @FilePath: /i18n_translation_vite/vue3Demo/src/lang/index.js
 */
import '../../lang/index'
import EN from '../../lang/en/index.mjs'
import CN from '../../lang/zh-cn/index.mjs'
import KO from '../../lang/ko/index.mjs'
const langMap = {
    en: window?.lang?.en || EN,
    zhcn: window?.lang?.zhcn || CN,
    ko: window?.lang?.ko || KO,
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], 'lang')
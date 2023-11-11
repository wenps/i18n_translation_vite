/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 13:08:36
 * @LastEditTime: 2023-11-11 17:48:50
 * @FilePath: /i18n_translation_vite/example/vue3/src/lang/index.js
 */
import '../../lang/index'
import EN from '../../lang/en/index.mjs'
import CN from '../../lang/zh-cn/index.mjs'
import KO from '../../lang/ko/index.mjs'
import JA from '../../lang/ja/index.mjs'
const langMap = {
    en: window?.lang?.en || EN,
    zhcn: window?.lang?.zhcn || CN,
    ko: window?.lang?.ko || KO,
    ja: window?.lang?.ja || JA,
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], 'lang')
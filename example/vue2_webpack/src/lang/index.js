/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 13:08:36
 * @LastEditTime: 2024-12-07 16:54:46
 * @FilePath: /i18n_translation_vite/example/vue2_webpack/src/lang/index.js
 */
import '../../lang/index'
import langJSON from '../../lang/index.json'
const langMap = {
    en: window?.lang?.en || _getJSONKey('en', langJSON),
    zhcn: window?.lang?.zhcn || _getJSONKey('zhcn', langJSON),
    ko: window?.lang?.ko || _getJSONKey('ko', langJSON),
    ja: window?.lang?.ja || _getJSONKey('ja', langJSON)
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], 'lang')

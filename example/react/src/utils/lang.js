/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-20 12:00:30
 * @LastEditTime: 2023-11-20 14:07:45
 * @FilePath: /i18n_translation_vite/example/react/src/utils/lang.js
 */
import '../../lang/index'
import langJSON from '../../lang/index.json'
const langMap = {
    en: window?.lang?.en || _getJSONKey('en', langJSON),
    zhcn: window?.lang?.zhcn || _getJSONKey('zhcn', langJSON)
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], 'lang')

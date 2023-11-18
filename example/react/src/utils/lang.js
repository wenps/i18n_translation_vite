import '../../lang/index'
// import EN from '../../lang/en/index.mjs'
// import CN from '../../lang/zh-cn/index.mjs'
const langMap = {
    en: window?.lang?.en ,
    zhcn: window?.lang?.zhcn
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], 'lang')
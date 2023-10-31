/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-30 18:23:03
 * @LastEditTime: 2023-10-31 11:16:45
 * @FilePath: /i18n_translation_vite/src/plugins/utils/translate.ts
 */
export let langObj:any = {}

// 设置翻译对象属性
export function setLangObj(key:string, value:string) {
  if(!langObj[key]) {
    langObj[key] = value
  }
}

export function getLangObj() {
  return langObj
}

// 初始化翻译对象
export function initLangObj(obj:any) {
  if(!Object.keys(langObj)) {
    langObj = obj
  }
}
/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-30 18:23:03
 * @LastEditTime: 2023-11-11 17:44:11
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/utils/translate.ts
 */

import { fileUtils } from './index.js';
import { option } from '../option';
const tunnel = require('tunnel');
const { translate } = require('@vitalets/google-translate-api');

/**
 * @description: 调用翻译API
 * @param {string} text
 * @return {*}
 */
const translateText = async (text: string, fromKey: string, toKey: string) => {
  let data = await translate(text, {
    from: fromKey,
    to: toKey,
    fetchOptions: {
      agent: tunnel.httpsOverHttp({
        proxy: {
          port: 7890,
          host: '127.0.0.1',
          headers: {
            'User-Agent': 'Node'
          }
        }
      })
    }
  }).catch((err:any) => {
    console.error('自动翻译api，请求异常')
    throw new Error(err);
  });
  return data['text'] || '';
};

export let langObj: any = {};

/**
 * @description: 设置翻译对象属性
 * @param {string} key
 * @param {string} value
 * @return {*}
 */
export function setLangObj(key: string, value: string) {
  if (!langObj[key]) {
    langObj[key] = value;
  }
}

/**
 * @description: 读取翻译对象
 * @return {*}
 */
export function getLangObj() {
  return langObj;
}


/**
 * @description: 初始化翻译对象
 * @param {any} obj
 * @return {*}
 */
export function initLangObj(obj: any) {
  if (!Object.keys(langObj)) {
    langObj = obj;
  }
}


/**
 * @description: 生成国际化配置文件
 * @return {*}
 */
export async function googleAutoTranslate() {
  let originLangObjMap:any = {}

  // 获取原始语言
  option.langKey.forEach((item => {
    originLangObjMap[item] = fileUtils.getLangObjByJSONFileWithLangKey(item);
  }))
  
  // 拿到更新后的语言
  const langObj = JSON.parse(JSON.stringify(getLangObj()));
  // 生产需要更新的语言对象
  let transLangObj: any = {};
  Object.keys(langObj).forEach((key) => {
    if (!originLangObjMap[option.originLang][key]) {
      transLangObj[key] = langObj[key];
    }
  });
  // 没有需要翻译的
  if(!Object.keys(transLangObj).length) {
    console.info('没有需要翻译的内容！')
    return 
  }

  // 创建翻译文本
  let Text = Object.values(transLangObj).join('\n###\n');
  let newLangObjMap:any = {}
  for (let index = 0; index < option.langKey.length; index++) {
    if(index === 0) {
      newLangObjMap[option.originLang] = transLangObj
      continue
    } 
    console.info('开始自动翻译...')
    const res = await translateText(Text, option.originLang, option.langKey[index]);
    const resultValues = res.split(/\n *# *# *# *\n/).map((v: string) => v.trim()); // 拆分文案
    if (resultValues.length !== Object.values(transLangObj).length) {
      console.error('翻译异常，翻译结果缺失❌')
      return
    }
    newLangObjMap[option.langKey[index]] = resultValues
    console.info('翻译成功⭐️⭐️⭐️')
  }
  Object.keys(transLangObj).forEach((key, index) => {
    option.langKey.forEach(((item, i) => {
      if(i === 0) {
        originLangObjMap[item][key] = newLangObjMap[item][key]
      } else {
        originLangObjMap[item][key] = newLangObjMap[item][index]
      }
    }))
  });
  
  option.langKey.forEach((item => {
    fileUtils.setLangTranslateFileContent(item, originLangObjMap[item]);
  }))
  console.log('开始写入JSON配置文件...')
  const JSONLangObj:any = {}
  Object.keys(originLangObjMap[option.originLang]).forEach(key => {
    JSONLangObj[key] = {}
    option.langKey.forEach((item => {
      JSONLangObj[key][item] = originLangObjMap[item][key]
    }))
  })
  try {
    fileUtils.setLangTranslateJSONFile(JSON.stringify(JSONLangObj))
    console.info('JSON配置文件写入成功⭐️⭐️⭐️')
  } catch (error) {
    console.error('❌JSON配置文件写入失败' + error)
  }
}

/**
 * @description: 新增语言类型配置补全
 * @param {any} obj
 * @return {*}
 */
export function languageConfigCompletion(obj:any){
  if(!Object.keys(obj)) return
  let needCompletionList:any[] = []
  const JSONobj = JSON.parse(fileUtils.getLangTranslateJSONFile())
  option.targetLangList.forEach((item)=>{
    let langObj = fileUtils.getLangObjByJSONFileWithLangKey(item, JSONobj)
    needCompletionList.push({
      key:item,
      curLangObj:langObj
    })
  })
  needCompletionList.forEach(async (item) => {
    await completionTranslateAndWriteConfigFile(obj, item.curLangObj, item.key)
  })
}

/**
 * @description: 补全新增语言翻译写入函数
 * @param {any} langObj
 * @param {any} curLangObj
 * @param {string} translateKey
 * @return {*}
 */
export async function completionTranslateAndWriteConfigFile(langObj:any, curLangObj:any, translateKey:string) {
  // 生产需要更新的语言对象
  let transLangObj: any = {};
  Object.keys(langObj).forEach((key) => {
    if (!curLangObj[key]) {
      transLangObj[key] = langObj[key];
    }
  });

  if(!Object.values(transLangObj).length) return

  // 创建翻译文本
  let Text = Object.values(transLangObj).join('\n###\n');

  console.info('进入新增语言补全翻译...')
  const res = await translateText(Text, option.originLang, translateKey);
  const resultValues = res.split(/\n *# *# *# *\n/).map((v: string) => v.trim()); // 拆分文案
  if (resultValues.length !== Object.values(langObj).length) {
    console.error('翻译异常，翻译结果缺失❌')
    return
  }
  let newLangObjMap = resultValues
  console.info('翻译成功⭐️⭐️⭐️')


  Object.keys(transLangObj).forEach((key, index) => {
    curLangObj[key] = newLangObjMap[index]
  });

  fileUtils.setLangTranslateFileContent(translateKey, curLangObj);

  console.log('开始写入JSON配置文件...')
  const JSONLangObj:any = JSON.parse(fileUtils.getLangTranslateJSONFile())

  Object.keys(transLangObj).forEach(key => {
    JSONLangObj[key][translateKey] = curLangObj[translateKey]
  })
  try {
    fileUtils.setLangTranslateJSONFile(JSON.stringify(JSONLangObj))
    console.info('JSON配置文件写入成功⭐️⭐️⭐️')
  } catch (error) {
    console.error('❌JSON配置文件写入失败' + error)
  }
  console.info('新增语言翻译补全成功⭐️⭐️⭐️')
}
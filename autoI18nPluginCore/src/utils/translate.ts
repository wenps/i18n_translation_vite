/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-30 18:23:03
 * @LastEditTime: 2024-04-03 19:05:09
 * @FilePath: /i18n_translation_vite/autoI18nPluginCore/src/utils/translate.ts
 */

import { fileUtils } from './index.js';
import { option } from '../option';
import { TranslateApiEnum } from 'src/enums/index.js';
import { truncate } from './base.js';
const tunnel = require('tunnel');
const { translate } = require('@vitalets/google-translate-api');
const CryptoJS = require('crypto-js')
const axios = require('axios')

type langObj = { [key: string]: string }

/**
 * @description: 调用谷歌翻译API
 * @param {string} text
 * @param {string} fromKey
 * @param {string} toKey
 * @return {*}
 */
const GoogleTranslate = async (text: string, fromKey: string, toKey: string) => {
  let data = await translate(text, {
    from: fromKey,
    to: toKey,
    fetchOptions: {
      agent: tunnel.httpsOverHttp({
        proxy: {
          port: option.post,
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

/**
 * @description: 调用有道翻译API
 * @param {string} text
 * @param {string} fromKey
 * @param {string} toKey
 * @return {*}
 */
const YoudaoTranslate = async (text: string, fromKey: string, toKey: string) => {
  let key = '';
  let salt = (new Date).getTime();
  let curtime = Math.round(new Date().getTime()/1000);
  let str = option.youdaoAppId + truncate(text) + salt + curtime + key;
  let sign = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
  const data = {
    q: text,
    appKey: option.youdaoAppId,
    salt,
    from: fromKey,
    to: toKey,
    sign,
    signType: "v3",
    curtime,
  };
  return axios.post('https://openapi.youdao.com/api', data)
    .then((response:any) => {
      // 请求成功，返回响应数据
      return response.data['translation'];
    })
    .catch((error:Error) => {
      // 请求失败，返回错误信息
      return Promise.reject(error);
    });
}

// 翻译映射map
const TranslateFnMap = {
  [TranslateApiEnum.google]: GoogleTranslate,
  [TranslateApiEnum.youdao]: YoudaoTranslate
}


export let langObj: langObj = {};

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
 * @param {langObj} obj
 * @return {*}
 */
export function initLangObj(obj: langObj) {
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
    const res = await TranslateFnMap[option.translate](Text, option.originLang, option.langKey[index]);
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
  
  console.log('开始写入JSON配置文件...')
  const configLangObj:any = {}
  Object.keys(originLangObjMap[option.originLang]).forEach(key => {
    configLangObj[key] = {}
    option.langKey.forEach((item => {
      configLangObj[key][item] = originLangObjMap[item][key]
    }))
  })
  try {
    fileUtils.setLangTranslateJSONFile(configLangObj)
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
  const res = await TranslateFnMap[option.translate](Text, option.originLang, translateKey);
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
  
  console.log('开始写入JSON配置文件...')
  const configLangObj:any = JSON.parse(fileUtils.getLangTranslateJSONFile())

  Object.keys(transLangObj).forEach(key => {
    configLangObj[key][translateKey] = curLangObj[key]
  })
  try {
    fileUtils.setLangTranslateJSONFile(configLangObj)
    console.info('JSON配置文件写入成功⭐️⭐️⭐️')
  } catch (error) {
    console.error('❌JSON配置文件写入失败' + error)
  }
  console.info('新增语言翻译补全成功⭐️⭐️⭐️')
}
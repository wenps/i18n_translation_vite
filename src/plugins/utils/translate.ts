/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-30 18:23:03
 * @LastEditTime: 2023-11-01 09:22:16
 * @FilePath: /i18n_translation_vite/src/plugins/utils/translate.ts
 */

const tunnel = require('tunnel');
const { translate } = require('@vitalets/google-translate-api');
import { fileUtils } from './index.js';
import { option } from '../option';

/**
 * @description: 调用翻译API
 * @param {string} text
 * @return {*}
 */
const translateText = async (text: string) => {
  let data = await translate(text, {
    from: option.langKey[0],
    to: option.langKey[1],
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
  }).catch(() => {
    throw new Error('翻译api请求异常');
  });
  return data['text'] || '';
};

export let langObj: any = {};

// 设置翻译对象属性
export function setLangObj(key: string, value: string) {
  if (!langObj[key]) {
    langObj[key] = value;
  }
}

// 读取翻译对象
export function getLangObj() {
  return langObj;
}

// 初始化翻译对象
export function initLangObj(obj: any) {
  if (!Object.keys(langObj)) {
    langObj = obj;
  }
}

// 生成国际化配置文件
export async function googleAutoTranslate() {
  // 拿到当前缓存的原始语言
  const curOriginLangObj = fileUtils.getLangTranslateFileContent(option.langKey[0], option.globalPath);
  // 拿到当前缓存的目标语言
  const curTargetLangObj = fileUtils.getLangTranslateFileContent(option.langKey[1], option.globalPath);
  
  // 拿到更新后的语言
  const langObj = JSON.parse(JSON.stringify(getLangObj()));
  // 生产需要更新的语言对象
  let transLangObj: any = {};
  Object.keys(langObj).forEach((key) => {
    if (!curOriginLangObj[key]) {
      transLangObj[key] = langObj[key];
    }
  });
  // 没有需要翻译的
  if(!Object.keys(transLangObj).length) return
  // 创建翻译文本
  let Text = Object.values(transLangObj).join('\n###\n');
  const res = await translateText(Text);
  const resultValues = res.split(/\n *# *# *# *\n/).map((v: string) => v.trim()); // 拆分文案
  if (resultValues.length !== Object.values(transLangObj).length) {
    throw new Error('翻译异常，长度缺少');
  }
  Object.keys(transLangObj).forEach((key, index) => {
    curOriginLangObj[key] = transLangObj[key];
    curTargetLangObj[key] = resultValues[index];
  });
  fileUtils.setLangTranslateFileContent(option.langKey[0], option.globalPath, curOriginLangObj);
  fileUtils.setLangTranslateFileContent(option.langKey[1], option.globalPath, curTargetLangObj);
}
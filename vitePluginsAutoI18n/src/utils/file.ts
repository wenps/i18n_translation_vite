/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 13:28:03
 * @LastEditTime: 2023-11-04 16:36:34
 * @FilePath: /i18n_translation_vite/src/plugins/utils/file.ts
 */
import fs  from "fs";
import path from 'path'
import {option} from '../option'

/**
 * @description: 新建国际化配置文件夹
 * @return {*}
 */
 export function initLangFile() {
  if (!fs.existsSync(option.globalPath)) {
    fs.mkdirSync(option.globalPath); // 创建lang文件夹
    initLangTranslateFile(option.langKey[1], option.globalPath)
    initLangTranslateFile(option.langKey[0], option.globalPath)
  }
  initLangTranslateJSONFile()
  initTranslateBasicFnFile()
}

/**
 * @description: 生成国际化具体语言配置文件
 * @param {string} key
 * @param {string} Path
 * @return {*}
 */
export function initLangTranslateFile(key:string, Path:string) {
  const folderPath = path.join(Path, key)
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath); // 创建对应语言文件夹
    const esmIndexFilePath = path.join(folderPath, 'index.mjs')
    fs.writeFileSync(esmIndexFilePath, 'export default {}'); // 创建
  }
}

/**
 * @description: 读取国际化具体语言配置文件
 * @param {string} key
 * @param {string} Path
 * @return {*}
 */
export function getLangTranslateFileContent(key:string) {
  const indexFilePath = './' + path.join(option.globalPath, key, 'index.js')
  const content = require(indexFilePath);
  return content || {}
}

/**
 * @description: 读取国际化具体语言配置文件
 * @param {string} key
 * @param {string} Path
 * @return {*}
 */
export function setLangTranslateFileContent(key:string, content: object) {
  const esmIndexFilePath = path.join(option.globalPath, key, 'index.mjs')
  fs.writeFileSync(esmIndexFilePath, 'export default ' + JSON.stringify(content)); // 创建
}

/**
 * @description: 生成国际化基础调用函数文件
 * @return {*}
 */
export function initTranslateBasicFnFile() {
  const key = option.translateKey
  const translateBasicFnText = `(function () {
    let ${key} = function (key, val, nameSpace) {
      const langPackage = ${key}[nameSpace] ? ${key}[nameSpace] : ${key}.package
      return (langPackage || {})[key] || val;
    };
    let $${key} = function (val) {
      return val;
    };
    ${key}.locale = function (locale, nameSpace) {
      if (nameSpace) {
        ${key}[nameSpace] = locale || {};
      } else {
        ${key}.package = locale || {};
      }
    };
    window.${key} = window.${key} || ${key};
    window.$${key} = $${key};
  })();`
  const indexPath = path.join(option.globalPath, 'index.js')
  fs.writeFileSync(indexPath, translateBasicFnText); // 创建
}


/**
 * @description: 生成国际化JSON文件
 * @param {string} Path
 * @return {*}
 */
export function initLangTranslateJSONFile() {
  const indexPath = path.join(option.globalPath, 'index.json')
  if(!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, JSON.stringify({})); // 创建
  } else { // 同步代码到对应langKey下的配置文件中
    setLangTranslateFileContent(option.langKey[0], getLangObjByJSONFileWithLangKey(option.langKey[0]))
    setLangTranslateFileContent(option.langKey[1], getLangObjByJSONFileWithLangKey(option.langKey[1]))
  }
}

/**
 * @description: 读取国际化JSON文件
 * @return {*}
 */
export function getLangTranslateJSONFile() {
  const filePath = path.join(option.globalPath, 'index.json')
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('❌读取JSON配置文件异常，文件不存在');
    } else {
      console.log('❌读取JSON配置文件异常，无法读取文件');
    }
    return JSON.stringify({});
  }
}

/**
 * @description: 基于langKey获取JSON配置文件中对应语言对象
 * @param {string} key
 * @return {*}
 */
export function getLangObjByJSONFileWithLangKey(key:string) {
  const JSONObj = JSON.parse(getLangTranslateJSONFile())
  const langObj:any = {}
  Object.keys(JSONObj).forEach((value)=>{
    langObj[value] = JSONObj[value][key]
  })
  return langObj
}

/**
 * @description: 设置国际化JSON文件
 * @return {*}
 */
export function setLangTranslateJSONFile(content:string) {
  const filePath = path.join(option.globalPath, 'index.json')
  if(fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content); 
  } else {
    console.log('❌JSON配置文件写入异常，文件不存在');
  }
}

/**
 * @description: 构建时把lang配置文件设置到打包后到主文件中
 * @return {*}
 */
export function buildSetLangConfigToIndexFile() {
  const targetLangObj = getLangObjByJSONFileWithLangKey(option.langKey[1])
  const currentLangObj = getLangObjByJSONFileWithLangKey(option.langKey[0])
  if(fs.existsSync(option.distPath)) {
    fs.readdir(option.distPath, (err, files) => {
      if (err) {
        console.error('❌构建文件夹为空，翻译配置无法写入');
        return;
      }
    
      files.forEach((file) => {
        if (file.startsWith(option.distKey) && file.endsWith('.js')) {
          const filePath = path.join(option.distPath, file);
          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
              console.log(filePath);
              console.error('❌构建主文件不存在，翻译配置无法写入');
              return;
            }
            try {
              // 翻译配置写入主文件
              fs.writeFileSync(filePath, `window['${option.namespace}']={};window['${option.namespace}']['${option.langKey[0]}']=${JSON.stringify(currentLangObj)};window.${option.namespace}.${option.langKey[1]}=${JSON.stringify(targetLangObj)};` + data); 
              console.info('恭喜：翻译配置写入构建主文件成功🌟🌟🌟');
            } catch (err) {
              console.error('翻译配置写入构建主文件失败:', err);
            }
          });
        }
      });
    });
  }
}
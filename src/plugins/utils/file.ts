/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 13:28:03
 * @LastEditTime: 2023-11-01 14:31:52
 * @FilePath: /i18n_translation_vite/src/plugins/utils/file.ts
 */
import fs  from "fs";
import path from 'path'
import {option} from '../option'

/**
 * @description: 新建国际化配置文件夹
 * @return {*}
 */
 export function initLangFile(langFolderPath:string) {
  if (!fs.existsSync(langFolderPath)) {
    fs.mkdirSync(langFolderPath); // 创建lang文件夹
    initLangTranslateFile(option.langKey[1], langFolderPath)
    initLangTranslateFile(option.langKey[0], langFolderPath)
  }
  initTranslateBasicFn(langFolderPath)
  return {
    [option.langKey[1]]: getLangTranslateFileContent(option.langKey[1], langFolderPath),
    [option.langKey[0]]: getLangTranslateFileContent(option.langKey[0], langFolderPath)
  }
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
    fs.mkdirSync(folderPath); // 创建lang文件夹
    const indexFilePath = path.join(folderPath, 'index.js')
    const esmIndexFilePath = path.join(folderPath, 'index.mjs')
    fs.writeFileSync(indexFilePath, 'module.exports = {}'); // 创建
    fs.writeFileSync(esmIndexFilePath, 'export default {}'); // 创建
  }
}

/**
 * @description: 读取国际化具体语言配置文件
 * @param {string} key
 * @param {string} Path
 * @return {*}
 */
export function getLangTranslateFileContent(key:string, Path:string) {
  const indexFilePath = './' + path.join(Path, key, 'index.js')
  const content = require(indexFilePath);
  return content || {}
}

/**
 * @description: 读取国际化具体语言配置文件
 * @param {string} key
 * @param {string} Path
 * @return {*}
 */
export function setLangTranslateFileContent(key:string, Path:string, content: object) {
  const indexFilePath = path.join(Path, key, 'index.js')
  const esmIndexFilePath = path.join(Path, key, 'index.mjs')
  fs.writeFileSync(indexFilePath, 'module.exports = ' + JSON.stringify(content)); // 创建
  fs.writeFileSync(esmIndexFilePath, 'export default ' + JSON.stringify(content)); // 创建
}

/**
 * @description: 生成国际化基础调用函数文件
 * @return {*}
 */
export function initTranslateBasicFn(Path: string) {
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
  const indexPath = path.join(Path, 'index.js')
  fs.writeFileSync(indexPath, translateBasicFnText); // 创建
}

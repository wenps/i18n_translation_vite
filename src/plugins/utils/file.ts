/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 13:28:03
 * @LastEditTime: 2023-11-01 09:36:47
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
    fs.writeFileSync(indexFilePath, 'module.exports = {}'); // 创建
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
  fs.writeFileSync(indexFilePath, 'module.exports = ' + JSON.stringify(content)); // 创建
}

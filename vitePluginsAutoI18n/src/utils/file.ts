/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 13:28:03
 * @LastEditTime: 2023-11-18 10:44:56
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/utils/file.ts
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
  }
  option.langKey.forEach(item => {
    initLangTranslateFile(item)
  })
  initLangTranslateJSONFile()
  initTranslateBasicFnFile()
}

/**
 * @description: 生成国际化具体语言配置文件
 * @param {string} key
 * @return {*}
 */
export function initLangTranslateFile(key:string) {
  const folderPath = path.join(option.globalPath, key)
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
  const indexFilePath = './' + path.join(option.globalPath, key, 'index.mjs')
  let content = fs.readFileSync(indexFilePath, 'utf-8');
  content = extractExportDefaultContent(content)
  return content || {}
}

/**
 * @description: 正则解析esm代码内容
 * @param {string} jsCode
 * @return {*}
 */
function extractExportDefaultContent(jsCode:string) {
  const regex = /export\s+default\s+(.*)/s;
  const match = jsCode.match(regex);
  if (match && match[1]) {
    return JSON.parse(match[1]);
  }
  return '';
}

/**
 * @description: 写入国际化具体语言配置文件
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
 * @return {*}
 */
export function initLangTranslateJSONFile() {
  const indexPath = path.join(option.globalPath, 'index.json')
  if(!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, JSON.stringify({})); // 创建
  } else { // 同步代码到对应langKey下的配置文件中
    option.langKey.forEach(item => {
      setLangTranslateFileContent(item, getLangObjByJSONFileWithLangKey(item))
    })
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
export function getLangObjByJSONFileWithLangKey(key:string, insertJSONObj:object | undefined = undefined) {
  const JSONObj = insertJSONObj || JSON.parse(getLangTranslateJSONFile())
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
  if(!option.buildToDist) return
  let langObjMap:any = {}
  option.langKey.forEach(item => {
    langObjMap[item] = getLangObjByJSONFileWithLangKey(item)
  })
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
              console.error('❌构建主文件不存在，翻译配置无法写入');
              return;
            }
            let buildLangConfigString = ''
            Object.keys(langObjMap).forEach(item => {
              buildLangConfigString = buildLangConfigString + `window['${option.namespace}']['${item}']=${JSON.stringify(langObjMap[item])};`
            })
            try {
              // 翻译配置写入主文件
              fs.writeFileSync(filePath, `window['${option.namespace}']={};${buildLangConfigString}` + data); 
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
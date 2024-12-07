/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 13:28:03
 * @LastEditTime: 2024-12-07 15:11:01
 * @FilePath: /i18n_translation_vite/autoI18nPluginCore/src/utils/file.ts
 */
import fs from 'fs'
import path from 'path'
import { option } from '../option'
const jsonFormat = require('json-format')

/**
 * @description: 新建国际化配置文件夹
 * @return {*}
 */
export function initLangFile() {
    if (!fs.existsSync(option.globalPath)) {
        fs.mkdirSync(option.globalPath) // 创建lang文件夹
    }
    initLangTranslateJSONFile()
    initTranslateBasicFnFile()
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
    window._getJSONKey = function (key, insertJSONObj = undefined) {
      const JSONObj = insertJSONObj
      const langObj = {}
      Object.keys(JSONObj).forEach((value)=>{
        langObj[value] = JSONObj[value][key]
      })
      return langObj
    }
  })();`
    const indexPath = path.join(option.globalPath, 'index.js')
    if (!fs.existsSync(indexPath)) {
        // 不存在就创建
        fs.writeFileSync(indexPath, translateBasicFnText) // 创建
    }
}

/**
 * @description: 生成国际化JSON文件
 * @return {*}
 */
export function initLangTranslateJSONFile() {
    const indexPath = path.join(option.globalPath, 'index.json')
    if (!fs.existsSync(indexPath)) {
        // 不存在就创建
        fs.writeFileSync(indexPath, JSON.stringify({})) // 创建
    }
}

/**
 * @description: 读取国际化JSON文件
 * @return {*}
 */
export function getLangTranslateJSONFile() {
    const filePath = path.join(option.globalPath, 'index.json')
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        return content
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.log('❌读取JSON配置文件异常，文件不存在')
        } else {
            console.log('❌读取JSON配置文件异常，无法读取文件')
        }
        return JSON.stringify({})
    }
}

/**
 * @description: 基于langKey获取JSON配置文件中对应语言对象
 * @param {string} key
 * @return {*}
 */
export function getLangObjByJSONFileWithLangKey(
    key: string,
    insertJSONObj: object | undefined = undefined
) {
    const JSONObj = insertJSONObj || JSON.parse(getLangTranslateJSONFile())
    const langObj: any = {}
    Object.keys(JSONObj).forEach(value => {
        langObj[value] = JSONObj[value][key]
    })
    return langObj
}

/**
 * @description: 设置国际化JSON文件
 * @return {*}
 */
export function setLangTranslateJSONFile(obj: object) {
    const filePath = path.join(option.globalPath, 'index.json')
    const jsonObj = jsonFormat(obj)
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, jsonObj)
    } else {
        console.log('❌JSON配置文件写入异常，文件不存在')
    }
}

/**
 * @description: 构建时把lang配置文件设置到打包后到主文件中
 * @return {*}
 */
export function buildSetLangConfigToIndexFile() {
    if (!option.buildToDist) return
    let langObjMap: any = {}
    option.langKey.forEach(item => {
        langObjMap[item] = getLangObjByJSONFileWithLangKey(item)
    })
    if (fs.existsSync(option.distPath)) {
        fs.readdir(option.distPath, (err, files) => {
            if (err) {
                console.error('❌构建文件夹为空，翻译配置无法写入')
                return
            }

            files.forEach(file => {
                if (file.startsWith(option.distKey) && file.endsWith('.js')) {
                    const filePath = path.join(option.distPath, file)
                    fs.readFile(filePath, 'utf-8', (err, data) => {
                        if (err) {
                            console.log(filePath)
                            console.error('❌构建主文件不存在，翻译配置无法写入')
                            return
                        }
                        let buildLangConfigString = ''
                        Object.keys(langObjMap).forEach(item => {
                            buildLangConfigString =
                                buildLangConfigString +
                                `window['${option.namespace}']['${item}']=${JSON.stringify(langObjMap[item])};`
                        })
                        try {
                            // 翻译配置写入主文件
                            fs.writeFileSync(
                                filePath,
                                `window['${option.namespace}']={};${buildLangConfigString}` + data
                            )
                            console.info('恭喜：翻译配置写入构建主文件成功🌟🌟🌟')
                        } catch (err) {
                            console.error('翻译配置写入构建主文件失败:', err)
                        }
                    })
                }
            })
        })
    }
}

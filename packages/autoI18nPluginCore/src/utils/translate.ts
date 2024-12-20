/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-30 18:23:03
 * @LastEditTime: 2024-04-06 17:17:19
 * @FilePath: /i18n_translation_vite/autoI18nPluginCore/src/utils/translate/index.ts
 */

import * as fileUtils from './file'
import { option } from 'src/option'

type langObj = { [key: string]: string }

export let langObj: langObj = {}

/**
 * @description: 设置翻译对象属性
 * @param {string} key
 * @param {string} value
 * @return {*}
 */
export function setLangObj(key: string, value: string) {
    if (!langObj[key]) {
        langObj[key] = value
    }
}

/**
 * @description: 读取翻译对象
 * @return {*}
 */
export function getLangObj() {
    return langObj
}

/**
 * @description: 初始化翻译对象
 * @param {langObj} obj
 * @return {*}
 */
export function initLangObj(obj: langObj) {
    if (!Object.keys(langObj)) {
        langObj = obj
    }
}

/**
 * @description: 生成国际化配置文件
 * @return {*}
 */
export async function autoTranslate() {
    let originLangObjMap: any = {}

    // 获取原始语言
    option.langKey.forEach(item => {
        originLangObjMap[item] = fileUtils.getLangObjByJSONFileWithLangKey(item)
    })

    // 拿到更新后的语言
    const langObj = JSON.parse(JSON.stringify(getLangObj()))
    // 生产需要更新的语言对象
    let transLangObj: any = {}
    Object.keys(langObj).forEach(key => {
        if (!originLangObjMap[option.originLang][key]) {
            transLangObj[key] = langObj[key]
        }
    })
    // 没有需要翻译的
    if (!Object.keys(transLangObj).length) {
        console.info('没有需要翻译的内容！')
        return
    }

    // 创建翻译文本
    let text = Object.values(transLangObj).join('\n┇┇┇\n')
    let newLangObjMap: any = {}
    for (let index = 0; index < option.langKey.length; index++) {
        if (index === 0) {
            newLangObjMap[option.originLang] = transLangObj
            continue
        }
        console.info('开始自动翻译...')
        const res = await option.translator.translate(
            text,
            option.originLang,
            option.langKey[index]
        )
        const resultValues = res.split(/\n┇ *┇ *┇\n/).map(v => v.trim()) // 拆分文案
        if (resultValues.length !== Object.values(transLangObj).length) {
            console.error('翻译异常，翻译结果缺失❌')
            return
        }
        newLangObjMap[option.langKey[index]] = resultValues
        console.info('翻译成功⭐️⭐️⭐️')
    }
    Object.keys(transLangObj).forEach((key, index) => {
        option.langKey.forEach((item, i) => {
            if (i === 0) {
                originLangObjMap[item][key] = newLangObjMap[item][key]
            } else {
                originLangObjMap[item][key] = newLangObjMap[item][index]
            }
        })
    })

    console.log('开始写入JSON配置文件...')
    const configLangObj: any = {}
    Object.keys(originLangObjMap[option.originLang]).forEach(key => {
        configLangObj[key] = {}
        option.langKey.forEach(item => {
            configLangObj[key][item] = originLangObjMap[item][key]
        })
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
export function languageConfigCompletion(obj: any) {
    if (!Object.keys(obj)) return
    let needCompletionList: any[] = []
    const JSONobj = JSON.parse(fileUtils.getLangTranslateJSONFile())
    option.targetLangList.forEach(item => {
        let langObj = fileUtils.getLangObjByJSONFileWithLangKey(item, JSONobj)
        needCompletionList.push({
            key: item,
            curLangObj: langObj
        })
    })
    needCompletionList.forEach(async item => {
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
export async function completionTranslateAndWriteConfigFile(
    langObj: any,
    curLangObj: any,
    translateKey: string
) {
    // 生产需要更新的语言对象
    let transLangObj: any = {}
    Object.keys(langObj).forEach(key => {
        if (!curLangObj[key]) {
            transLangObj[key] = langObj[key]
        }
    })

    if (!Object.values(transLangObj).length) return

    // 创建翻译文本
    let text = Object.values(transLangObj).join('\n┇┇┇\n')

    console.info('进入新增语言补全翻译...')
    const res = await option.translator.translate(text, option.originLang, translateKey)
    const resultValues = res.split(/\n┇ *┇ *┇\n/).map(v => v.trim()) // 拆分文案
    if (resultValues.length !== Object.values(langObj).length) {
        console.error('翻译异常，翻译结果缺失❌')
        return
    }
    let newLangObjMap = resultValues
    console.info('翻译成功⭐️⭐️⭐️')

    Object.keys(transLangObj).forEach((key, index) => {
        curLangObj[key] = newLangObjMap[index]
    })

    console.log('开始写入JSON配置文件...')
    const configLangObj: any = JSON.parse(fileUtils.getLangTranslateJSONFile())

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

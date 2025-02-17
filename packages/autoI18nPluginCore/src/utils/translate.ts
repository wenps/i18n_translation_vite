/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-30 18:23:03
 * @LastEditTime: 2025-02-17 10:40:37
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/utils/translate.ts
 */

import * as fileUtils from './file'
import { option } from 'src/option'

const SEPARATOR = '\n┇┇┇\n'
const SPLIT_SEPARATOR_REGEX = /\n┇ *┇ *┇\n/

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
    let text = Object.values(transLangObj).join(SEPARATOR)
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
        const resultValues = res.split(SPLIT_SEPARATOR_REGEX).map(v => v.trim()) // 拆分文案
        if (resultValues.length !== Object.values(transLangObj).length) {
            console.error(`翻译结果缺失❌:
                预期数量: ${Object.values(transLangObj).length}
                实际数量: ${resultValues.length}
                样例数据: ${JSON.stringify(resultValues.slice(0, 3))}...
                原始响应: ${res.slice(0, 100)}...`)
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
    let text = Object.values(transLangObj).join(SEPARATOR)

    console.info('进入新增语言补全翻译...')
    const res = await option.translator.translate(text, option.originLang, translateKey)
    const resultValues = res.split(SPLIT_SEPARATOR_REGEX).map(v => v.trim()) // 拆分文案
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

function createTextSplitter(values: string[], maxChunkSize = 4500) {
    const SEP_LENGTH = SEPARATOR.length

    const result: string[] = []
    let buffer: string[] = []
    let currentSize = 0

    const commitBuffer = () => {
        if (buffer.length > 0) {
            result.push(buffer.join(SEPARATOR))
            buffer = []
            currentSize = 0
        }
    }

    for (const value of values) {
        const neededSpace = value.length + (buffer.length > 0 ? SEP_LENGTH : 0)

        // 处理单个超长文本的特殊情况
        if (value.length > maxChunkSize) {
            if (buffer.length > 0) commitBuffer()

            // 分割超长文本（如果需要）
            if (value.length > maxChunkSize * 1.5) {
                console.warn(`检测到超长文本（${value.length} 字符），建议人工检查`)
            }
            result.push(value)
            continue
        }

        // 正常分块逻辑
        if (currentSize + neededSpace > maxChunkSize) {
            commitBuffer()
        }

        // 更新缓冲区
        currentSize += neededSpace
        buffer.push(value)
    }

    commitBuffer() // 提交最后未完成的块

    // 后处理验证
    const validation = result.some(chunk => chunk.length > maxChunkSize)
    if (validation) {
        console.error('分块验证失败：存在超过限制的区块')
        return { textChunks: [], splitResult: () => [] }
    }

    return {
        textChunks: result,
        splitResult: (text: string) => text.split(SEPARATOR).map(v => v.trim())
    }
}

/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-11 10:01:43
 * @LastEditTime: 2025-02-14 10:33:54
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/utils/base.ts
 */
import { Node } from '@babel/types'
import types from '@babel/types'
import { option } from '../option'
import { FunctionFactoryOption } from './option'
import { REGEX_MAP } from 'src/constants'
import { OriginLangKeyEnum } from 'src/enums'

/**
 * @description: 是否包含来源语言字符
 * @param {string} code
 * @return {*}
 */
export function hasOriginSymbols(code: string) {
    const originLang = FunctionFactoryOption.originLang as OriginLangKeyEnum
    return REGEX_MAP[originLang].test(code)
}

/**
 * @description: 过滤注释
 * @param {string} code
 * @return {*}
 */
export const removeComments = function (code: string) {
    // 使用正则表达式匹配并删除单行注释
    code = code.replace(/\/\/.*?\n/g, '')
    // 使用正则表达式匹配并删除多行注释
    code = code.replace(/\/\*[\s\S]*?\*\//g, '')
    // 使用正则表达式匹配并删除HTML注释
    code = code.replace(/<!--[\s\S]*?-->/g, '')
    return code
}

/**
 * @description: 用于判断提供的值是否符合正则表达式数组中的任一规则，符合则跳过
 * @param {*} value
 * @param {*} regexArray
 * @return {*}
 */
export function checkAgainstRegexArray(value: string, regexArray: string[] | RegExp[]) {
    for (let i = 0; i < regexArray.length; i++) {
        const regex = typeof regexArray[i] === 'string' ? new RegExp(regexArray[i]) : regexArray[i]
        if ((regex as RegExp).test(value)) {
            return true // 如果符合任何一个规则，返回 true
        }
    }
    return false // 如果所有规则都不符合，返回 false
}

/**
 * @description: 用于解析抽象语法树中的调用表达式，并提取出调用的名称，如a.b.c() 取 c。
 * @param {any} node
 * @return {*}
 */
export function extractFunctionName(node: Node): string {
    let callName = ''
    function callObjName(callObj: any, name: string): string {
        name += '.' + (callObj.property as any).name
        if (types.isMemberExpression(callObj.object)) {
            // isMemberExpression： 是否是成员表达式
            return callObjName(callObj.object, name)
        }
        name = (callObj.object as any).name + name
        return name
    }
    if (types.isCallExpression(node)) {
        // isCallExpression： 是否是调用表达式
        if (types.isMemberExpression((node as any).callee)) {
            callName = callObjName((node as any).callee, '')
        } else {
            callName = ((node as any).callee as any).name || ''
        }
    }
    return callName
}

/**
 * @description: 提取文件的中文部分
 * @param {string} fileContent
 * @return {*}
 */
export const extractCnStrings = (fileContent: string) => {
    const regex = /[^\x00-\xff]+/g
    return extractStrings(fileContent, regex)
}

/**
 * @description: 提取文件指定部分内容
 * @param {string} fileContent
 * @param {any} regex
 * @return {*}
 */
export function extractStrings(fileContent: string, regex: any) {
    const matches = fileContent.match(regex)
    return matches ? matches.filter((item, index) => matches.indexOf(item) === index) : []
}

/**
 * @description: 生成i8n翻译函数
 * @param {string} value
 * @param {boolean} isExpression
 * @param {string} key
 * @return {*}
 */
export function createI18nTranslator(value: string, isExpression?: boolean, key?: string): any {
    const nameSpace = option.namespace
    const trimmedValue = value.trim()
    const valStr = trimmedValue.replace(/'/g, '"').replace(/(\n)/g, '\\n')
    const generatedKey = key || generateId(valStr)
    if (isExpression) {
        const valueExp = types.stringLiteral(trimmedValue)
        valueExp.extra = {
            raw: `'${valStr}'`, // 防止转码为unicode
            rawValue: trimmedValue
        }
        return types.callExpression(types.identifier(option.translateKey), [
            types.stringLiteral(generatedKey),
            valueExp,
            types.stringLiteral(nameSpace)
        ])
    } else {
        return `${option.translateKey}('${generatedKey}','${valStr}','${nameSpace}')`
    }
}

/**
 * @description: 生成唯一id
 * @param {string} key
 * @return {*}
 */
export function generateId(key: string) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
        const charCode = key.charCodeAt(i)
        hash = (hash << 5) - hash + charCode
        hash = hash & hash
    }
    const id = Math.abs(hash).toString(36) + key.length.toString(36)
    return id
}

/**
 * @description: unicode转中文
 * @param {string} str
 * @return {*}
 */
export const unicodeToChinese = (str: string) => {
    return str.replace(/\\u[\dA-Fa-f]{4}/g, (match: any) => {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
    })
}

/**
 * @description: 有道翻译 标识截取
 * @param {string} q
 * @return {*}
 */
export function truncate(q: string) {
    // 检查输入字符串的长度
    if (q.length <= 20) {
        // 如果长度小于等于20，直接返回原字符串
        return q
    } else {
        // 如果长度大于20，截取前10个字符和后10个字符，并在中间插入长度信息
        const len = q.length
        return q.substring(0, 10) + len + q.substring(len - 10)
    }
}

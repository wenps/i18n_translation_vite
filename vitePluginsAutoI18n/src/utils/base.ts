/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-11 10:01:43
 * @LastEditTime: 2023-11-04 15:08:56
 * @FilePath: /i18n_translation_vite/src/plugins/utils/base.ts
 */
import { Node } from '@babel/types';
import { option } from '../option'
const types = require("@babel/types"); 

/**
 * @description: 是否包含中文字符
 * @param {string} code
 * @return {*}
 */
export function hasChineseSymbols(code: string) {
  var pattern = /[\u4e00-\u9fff]/;
  return pattern.test(code);
}

/**
 * @description: 过滤注释
 * @param {string} code
 * @return {*}
 */
export const removeComments = function(code: string) {
  // 使用正则表达式匹配并删除单行注释
  code = code.replace(/\/\/.*?\n/g, '');
  // 使用正则表达式匹配并删除多行注释
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // 使用正则表达式匹配并删除HTML注释
  code = code.replace(/<!--[\s\S]*?-->/g, '');
  return code;
}

/**
 * @description: 用于判断提供的值是否符合正则表达式数组中的任一规则，符合则跳过
 * @param {*} value
 * @param {*} regexArray
 * @return {*}
 */
export function checkAgainstRegexArray(value: string, regexArray: string[] | RegExp[]) {
  for (let i = 0; i < regexArray.length; i++) {
    const regex = typeof regexArray[i] === 'string' ? new RegExp(regexArray[i]) : regexArray[i];
    if ((regex as RegExp).test(value)) {
      return true; // 如果符合任何一个规则，返回 true
    }
  }
  return false; // 如果所有规则都不符合，返回 false
}

/**
 * @description: 用于解析抽象语法树中的调用表达式，并提取出调用的名称，如a.b.c() 取 c。
 * @param {any} node
 * @return {*}
 */
export function extractFunctionName(node: Node): string {
  let callName = "";
  // 多级命名空间,如：xxx.xxx.xxx
  function callObjName(callObj: any, name: string): string {
    name += "." + (callObj.property as any).name;
    if (types.isMemberExpression(callObj.object)) { // isMemberExpression： 是否是成员表达式
      return callObjName(callObj.object, name);
    }
    name = (callObj.object as any).name + name;
    return name;
  }
  if (types.isCallExpression(node)) { // isCallExpression： 是否是调用表达式
    if (types.isMemberExpression(node.callee)) {
      callName = callObjName(node.callee, "");
    } else {
      callName = (node.callee as any).name || "";
    }
  }
  return callName;
}

/**
 * @description: 提取文件的中文部分
 * @param {string} fileContent
 * @return {*}
 */
export const extractCnStrings = (fileContent: string) => {
  const regex = /[^\x00-\xff]+/g;
  return extractStrings(fileContent, regex);
}

/**
 * @description: 提取文件指定部分内容
 * @param {string} fileContent
 * @param {any} regex
 * @return {*}
 */
export function extractStrings(fileContent: string, regex: any) {
  const matches = fileContent.match(regex);
  return matches ? matches.filter((item, index) => matches.indexOf(item) === index) : [];
}

/**
 * @description: 生成i8n翻译函数
 * @param {string} value
 * @param {boolean} isExpression
 * @param {string} key
 * @return {*}
 */
export function createI18nTranslator(value: string, isExpression?: boolean, key?: string): any {
  const nameSpace = option.namespace;
  const trimmedValue = value.trim();
  const valStr = trimmedValue.replace(/'/g, '"').replace(/(\n)/g, "\\n");
  const generatedKey = key || generateId(valStr);
  if (isExpression) {
    const valueExp = types.stringLiteral(trimmedValue);
    valueExp.extra = {
      raw: `'${valStr}'`, // 防止转码为unicode
      rawValue: trimmedValue,
    };
    return types.callExpression(types.identifier(option.translateKey), [
      types.stringLiteral(generatedKey),
      valueExp,
      types.stringLiteral(nameSpace),
    ]);
  } else {
    return `${option.translateKey}('${generatedKey}','${valStr}','${nameSpace}')`;
  }
}

/**
 * @description: 生成唯一id
 * @param {string} key
 * @return {*}
 */
export function generateId(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const charCode = key.charCodeAt(i);
    hash = ((hash << 5) - hash) + charCode;
    hash = hash & hash;
  }
  const id = Math.abs(hash).toString(36) + key.length.toString(36);
  return id;
}

/**
 * @description: unicode转中文
 * @param {string} str
 * @return {*}
 */
export const unicodeToChinese = (str: string) => {
  return str.replace(/\\u[\dA-Fa-f]{4}/g, (match: any) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
};
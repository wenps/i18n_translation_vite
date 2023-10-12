/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-11 10:01:43
 * @LastEditTime: 2023-10-12 13:32:30
 * @FilePath: /i18n_translation_vite/src/plugins/utils/base.ts
 */
/**
 * @description: 是否包含中文字符
 * @param {string} code
 * @return {*}
 */
export function hasChineseSymbols(code:string) {
  var pattern = /[\u4e00-\u9fff]/;
  return pattern.test(code);
}


/**
 * @description: 过滤注释
 * @param {string} code
 * @return {*}
 */
export const removeComments = function(code:string) {
  // 使用正则表达式匹配并删除单行注释
  code = code.replace(/\/\/.*?\n/g, '');
  // 使用正则表达式匹配并删除多行注释
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // 使用正则表达式匹配并删除HTML注释
  code = code.replace(/<!--[\s\S]*?-->/g, '');
  return code;
}

/**
 * @description: 提取文件的中文部分
 * @param {string} fileContent
 * @return {*}
 */
export const extractCnStrings = (fileContent:string) => {
  const regex = /[^\x00-\xff]+/g;
  return extractStrings(fileContent, regex)
}

/**
 * @description: 提取文件制定部分内容
 * @param {string} fileContent
 * @param {any} regex
 * @return {*}
 */
function extractStrings(fileContent:string, regex: any) {
  const matches = fileContent.match(regex);
  return matches ? matches.filter((item, index) => matches.indexOf(item) === index) : [];
}
/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-01 16:35:38
 * @LastEditTime: 2023-11-14 18:24:14
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/filter/visitor/TemplateElement.ts
 */
const types = require("@babel/types"); 
import { option } from "../../option";
import { baseUtils } from "../../utils";

export default function (path: any) {
  let { node, parent } = path;
  if(!node.value) return 
  
  let value = node.value.raw || node.value.cooked; // 获取模板字符串的值
  // 当前模版字符串是否包含中文，是否包含过滤字段
  if (baseUtils.hasChineseSymbols(value) && (option.excludedPattern.length && !baseUtils.checkAgainstRegexArray(value, [...option.excludedPattern]))) {
    // 获取真实调用函数
    const extractFnName = baseUtils.extractFunctionName(parent)
    // 调用语句判断当前调用语句是否包含需要过滤的调用语句
    if((types.isCallExpression(parent) && extractFnName && option.excludedCall.includes(extractFnName))) return 

    // 生成字符类型翻译节点
    let newNode = baseUtils.createI18nTranslator(value);
    
    // 替换为字符类型翻译节点
    node.value.raw = node.value.cooked = `\${${newNode})}`
  }
};
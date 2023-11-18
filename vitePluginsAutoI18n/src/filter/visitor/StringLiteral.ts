
/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:18:51
 * @LastEditTime: 2023-11-14 18:24:35
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/filter/visitor/StringLiteral.ts
 */
import * as types from "@babel/types"
import { baseUtils } from "../../utils/index";
import { option } from '../../option'

export default function(path:any) {
  let { node, parent } = path;
  let value = node.value;
  console.log('node', node);
  
  // 是否存在来源语言字符，是否在默认字符串中
  if(baseUtils.hasOriginSymbols(value) && (option.excludedPattern.length && !baseUtils.checkAgainstRegexArray(value, [...option.excludedPattern]))) {
    // 获取真实调用函数
    const extractFnName = baseUtils.extractFunctionName(parent)
    // 防止导入语句，只处理那些当前节点不是键值对的键的字符串字面量，调用语句判断当前调用语句是否包含需要过滤的调用语句
    if(types.isImportDeclaration(parent) || parent.key === node ||(types.isCallExpression(parent) && extractFnName && option.excludedCall.includes(extractFnName))) return 
    let replaceNode
    if (types.isJSXAttribute(parent)) {
      let expression = baseUtils.createI18nTranslator(value, true);
      replaceNode = types.jSXExpressionContainer(expression);
    } else {
      replaceNode = baseUtils.createI18nTranslator(value, true);
    }
    path.replaceWith(replaceNode);
  }
}

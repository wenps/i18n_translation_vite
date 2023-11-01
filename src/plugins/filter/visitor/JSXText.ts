/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-01 16:35:38
 * @LastEditTime: 2023-11-01 17:29:14
 * @FilePath: /i18n_translation_vite/src/plugins/filter/visitor/JSXText.ts
 */
const types = require("@babel/types"); 
import { baseUtils } from "../../utils";

export default function (path: any) {
  let { node } = path;
  let value = node.value;
  // 当前jsxText是否包含中文，是否包含过滤字段
  if (baseUtils.hasChineseSymbols(value) && !baseUtils.checkAgainstRegexArray(value, [])) {
    // 生成翻译节点
    let expression = baseUtils.createI18nTranslator(value, true);
    // 生成的翻译节点包装在  types.JSXExpressionContainer  中
    let newNode = types.JSXExpressionContainer(expression);
    // 使用  path.replaceWith  方法将原来的节点替换为新的翻译节点
    path.replaceWith(newNode);
  }
};
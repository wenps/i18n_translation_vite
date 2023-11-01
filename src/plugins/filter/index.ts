/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:00:37
 * @LastEditTime: 2023-11-01 16:35:49
 * @FilePath: /i18n_translation_vite/src/plugins/filter/index.ts
 */

import StringLiteral from "./visitor/StringLiteral";
import CallExpression from "./visitor/CallExpression";
import JSXText from "./visitor/JSXText";

export default function (api:any, config:any) {
  return {
    visitor: {
      StringLiteral,
      JSXText,
      TemplateElement: (path:any)=>{console.log()},
      CallExpression
    },
  };
};
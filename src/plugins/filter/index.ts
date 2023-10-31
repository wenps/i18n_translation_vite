/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:00:37
 * @LastEditTime: 2023-10-30 18:47:38
 * @FilePath: /i18n_translation_vite/src/plugins/filter/index.ts
 */

import StringLiteral from "./visitor/StringLiteral";
import CallExpression from "./visitor/CallExpression";

export default function (api:any, config:any) {
  return {
    visitor: {
      StringLiteral,
      JSXText: (path:any)=>{console.log()},
      TemplateElement: (path:any)=>{console.log()},
      CallExpression
    },
  };
};
/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:00:37
 * @LastEditTime: 2023-11-02 10:36:02
 * @FilePath: /i18n_translation_vite/src/plugins/filter/index.ts
 */

import StringLiteral from "./visitor/StringLiteral";
import CallExpression from "./visitor/CallExpression";
import TemplateElement from "./visitor/TemplateElement";
import JSXText from "./visitor/JSXText";

export default function (api:any, config:any) {
  return {
    visitor: {
      StringLiteral,
      JSXText,
      TemplateElement,
      CallExpression
    },
  };
};
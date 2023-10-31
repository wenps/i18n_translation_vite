/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 13:28:03
 * @LastEditTime: 2023-10-12 18:10:32
 * @FilePath: /i18n_translation_vite/src/plugins/utils/file.ts
 */
import fs  from "fs";

/**
 * @description: 新建国际化配置文件夹
 * @return {*}
 */
 export function initLangFile() {
  const langFolderPath = `./src/lang`;
  const indexFilePath = `${langFolderPath}/index.js`;
  if (!fs.existsSync(langFolderPath)) {
    fs.mkdirSync(langFolderPath); // 创建lang文件夹
    fs.writeFileSync(indexFilePath, '');
  }
  const content = fs.readFileSync(indexFilePath, 'utf-8');
  return content ? JSON.parse(content) : {}
}

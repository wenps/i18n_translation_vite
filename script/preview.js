/*
 * @Date: 2025-02-06 16:17:07
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-10 22:12:30
 * @FilePath: /i18n_translation_vite/script/preview.js
 */
// @ts-check
import shell from 'shelljs' // 使用 import 引入 shelljs 模块
import { select } from '@inquirer/prompts' // 使用 import 引入 select 函数
import fs from 'fs' // 使用 import 引入 fs 模块
import util from 'util' // 使用 import 引入 util 模块

const run = async () => {
    const readdir = util.promisify(fs.readdir)
    // 读取文件夹内容
    const files = await readdir('example', { withFileTypes: true })
    // 过滤出文件夹
    const choices = files
        .filter(file => file.isDirectory())
        .map(folder => {
            return {
                name: folder.name,
                value: folder.name
            }
        })

    const example = await select({
        message: 'please select preview example ——',
        choices: choices,
        default: choices[0].value
    })

    shell.cd(`example/${example}`)
    shell.exec('pnpm run dev')
}

run()

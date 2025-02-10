/*
 * @Date: 2024-12-07 16:03:52
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-10 19:18:47
 * @FilePath: /i18n_translation_vite/script/build.js
 */
// @ts-check
import shell from 'shelljs' // 使用 import 引入 shelljs 模块
import { select } from '@inquirer/prompts' // 使用 import 引入 select 函数

const parseArgsToMap = () => {
    const args = new Map()

    process.argv.forEach(arg => {
        const [key, value] = arg.split('=')
        args.set(key, value)
    })
    return args
}

// 解析命令行参数
const argMap = parseArgsToMap()

const run = async () => {
    // 自带指令 d 标识开发模式
    const isDev = argMap.has('d')
    const runBuild = () => {
        const buildCmd = 'pnpm build' + (isDev ? ' -w' : '')
        shell.exec(buildCmd, { async: isDev })
    }

    const choices = ['vite', 'webpack'].map(type => {
        return {
            name: type,
            value: type + 'PluginsAutoI18n' // 这里用了拼接，要留意后续目录是否变更
        }
    })
    let dir
    // 自带指令 p 标识指定插件类型
    if (argMap.has('p')) {
        dir = choices.find(choice => choice.name === argMap.get('p'))?.value
    }
    if (!dir) {
        dir = await select({
            message: 'please select plugin type ——',
            choices,
            default: choices[0].value
        })
    }
    shell.cd('packages/autoI18nPluginCore')
    runBuild()

    shell.cd('..')

    shell.cp('readme*', dir)
    shell.cd(dir)
    runBuild()
}

run()

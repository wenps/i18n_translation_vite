// @ts-check
const shell = require('shelljs')
const argMap = require('./utils').parseArgsToMap()
const { select } = require('@inquirer/prompts')

const run = async () => {
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
    shell.cd('autoI18nPluginCore')
    runBuild()

    shell.cd('..')

    shell.cp('readme*', dir)
    shell.cd(dir)
    runBuild()
}

run()

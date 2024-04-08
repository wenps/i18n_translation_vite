// @ts-check

const run = async () => {
    const shell = require('shelljs')
    const argMap = require('./utils').parseArgsToMap()
    shell.cd('autoI18nPluginCore')
    shell.exec('pnpm build')
    shell.cd('..')
    const choices = ['vite', 'webpack'].map(type => {
        return {
            name: type,
            value: type + 'PluginsAutoI18n'
        }
    })
    let dir
    if (argMap.has('p')) {
        dir = choices.find(choice => choice.name === argMap.get('p'))?.value
    }
    if (!dir) {
        const { select } = require('@inquirer/prompts')
        dir = await select({
            message: 'please select plugin type ——',
            choices,
            default: choices[0].value
        })
    }
    shell.cp('readme*', dir)
    shell.cd(dir)
    shell.exec('pnpm build')
}

run()

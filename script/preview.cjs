const run = async () => {
    const shell = require('shelljs')
    const { select } = require('@inquirer/prompts')
    const fs = require('fs')
    const path = require('path')
    const util = require('util')
    
    shell.exec('pnpm build:plugin')
    
    const readdir = util.promisify(fs.readdir)
    // 读取文件夹内容
    const files = await readdir('example', { withFileTypes: true })
    // 过滤出文件夹
    const folders = files.filter(file => file.isDirectory())
    
    const answer = await select({
        message: 'please select preview example——',
        choices: folders.map(folder => {
            return {
                name: folder.name,
                value: folder.name
            }
        }),
        default: folders[0].name
    })
    shell.cd(`example/${answer}`)
    shell.exec('pnpm link ../../vitePluginsAutoI18n')
    shell.exec('pnpm preview')
}

(async () => await run())()

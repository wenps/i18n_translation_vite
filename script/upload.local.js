import { checkbox, select } from '@inquirer/prompts'
import shell from 'shelljs'
import chalk from 'chalk'
import { writeFile } from 'fs/promises'

const TypeEnum = {
    CORE: 'core',
    PLUGIN: 'plugin'
}
const PluginTypeEnum = {
    WEBPACK: 'webpack',
    VITE: 'vite'
}
const TypeDirNameMap = {
    [TypeEnum.CORE]: 'autoI18nPluginCore',
    [PluginTypeEnum.WEBPACK]: 'webpackPluginsAutoI18n',
    [PluginTypeEnum.VITE]: 'vitePluginsAutoI18n'
}

const VersionTypeEnum = {
    MAJOR: 'major',
    SECONDARY: 'secondary',
    PATCH: 'patch'
}

const buildCmd = 'pnpm build'

/**
 * 选择 core ，同时会自动打包 plugin
 * 选择 plugin ，需要自行选择打包
 */
const run = async () => {
    const type = await select({
        name: 'type',
        choices: [
            { name: 'core', value: TypeEnum.CORE },
            { name: 'plugin', value: TypeEnum.PLUGIN }
        ],
        message: '请选择要打包的类型：',
        default: []
    })

    if (type === TypeEnum.CORE) {
        console.log(chalk.green`\n开始打包 core 和 plugin\n`)

        for (let key in TypeDirNameMap) {
            shell.exec(`cd ${`packages/${TypeDirNameMap[key]}`} && ${buildCmd}`)
        }
        console.log(chalk.green`\n打包完成!\n`)

        const versionType = await selectVersionType()

        console.log(chalk.green`\n开始修改版本号\n`)

        for (let key in TypeDirNameMap) {
            await generateVersion(
                versionType,
                `../packages/${TypeDirNameMap[key]}/package.json`,
                TypeDirNameMap[key]
            )
        }
        console.log(chalk.green`\n修改完成!\n`)

        commitCode()
    } else {
        const pluginType = await checkbox({
            name: 'pluginType',
            choices: [
                { name: 'webpack', value: PluginTypeEnum.WEBPACK },
                { name: 'vite', value: PluginTypeEnum.VITE }
            ],
            message: '请选择要打包的插件类型：',
            default: []
        })

        console.log(chalk.green`\n开始打包 plugin\n`)

        if (pluginType.includes(PluginTypeEnum.WEBPACK)) {
            shell.exec(`cd ${`packages/${TypeDirNameMap[PluginTypeEnum.WEBPACK]}`} && ${buildCmd}`)
        }

        if (pluginType.includes(PluginTypeEnum.VITE)) {
            shell.exec(`cd ${`packages/${TypeDirNameMap[PluginTypeEnum.VITE]}`} && ${buildCmd}`)
        }

        console.log(chalk.green`\n打包完成!\n`)

        if (pluginType.includes(PluginTypeEnum.WEBPACK)) {
            console.log(chalk.green`\n开始修改 webpack plugin 版本号`)

            const versionType = await selectVersionType()
            await generateVersion(
                versionType,
                `../packages/${TypeDirNameMap[PluginTypeEnum.WEBPACK]}/package.json`,
                TypeDirNameMap[PluginTypeEnum.WEBPACK]
            )
        }

        if (pluginType.includes(PluginTypeEnum.VITE)) {
            console.log(chalk.green`\n开始修改 vite plugin 版本号`)
            const versionType = await selectVersionType()
            await generateVersion(
                versionType,
                `../packages/${TypeDirNameMap[PluginTypeEnum.VITE]}/package.json`,
                TypeDirNameMap[PluginTypeEnum.VITE]
            )
        }

        console.log(chalk.green`\n修改完成!\n`)
    }
}

const selectVersionType = () => {
    return select({
        name: 'versionType',
        choices: [
            { name: '主版本号', value: VersionTypeEnum.MAJOR },
            { name: '次版本号', value: VersionTypeEnum.SECONDARY },
            { name: '补丁版本号', value: VersionTypeEnum.PATCH }
        ],
        message: '请选择版本类型：',
        default: []
    }).catch(() => {})
}

const commitCode = () => {
    console.log(chalk.green`\n开始提交代码!\n`)

    console.log(chalk.green`\n提交完成!\n`)
}

const generateVersion = async (versionType, pkgPath, pkgName) => {
    const pkg = await import(pkgPath, {
        assert: { type: 'json' }
    })
    const initVersion = pkg.default.version
    let version = initVersion
    if (versionType === VersionTypeEnum.MAJOR) {
        version = version.replace(/(\d+)(\.\d+\.\d+)/, (_, prefix) => `${Number(prefix + 1)}.0.0`)
    } else if (versionType === VersionTypeEnum.SECONDARY) {
        version = version.replace(
            /(\d+\.)(\d+)(\.\d+)/,
            (_, prefix, number) => `${prefix}${Number(number) + 1}.0`
        )
    } else {
        version = version.replace(
            /(\d+\.\d+\.)(\d+)/,
            (_, prefix, number) => `${prefix}${Number(number) + 1}`
        )
    }

    pkg.default.version = version
    console.log(chalk.blue(`\n${pkgName} 当前版本号：${initVersion} 修改为 ${version}`))
}

run()

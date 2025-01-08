import shell from 'shelljs'
import chalk from 'chalk'
import { writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

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

const publishCmd = 'pnpm publish'

function resolve(...filePaths) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    return path.resolve(__dirname, ...filePaths)
}

const run = async () => {
    for (let key in TypeDirNameMap) {
        shell.exec(`cd ${`packages/${TypeDirNameMap[key]}`} && ${buildCmd}`)
    }
    console.log(chalk.green`\n打包完成!\n`)

    // 特性版本
    const versionType = VersionTypeEnum.PATCH

    console.log(chalk.green`\n开始修改版本号\n`)

    for (let key in TypeDirNameMap) {
        await generateVersion(
            versionType,
            resolve(`../packages/${TypeDirNameMap[key]}/package.json`),
            TypeDirNameMap[key]
        )
    }
    console.log(chalk.green`\n修改完成!\n`)

    commitCode()

    uploadPackage()
}

const commitCode = () => {
    console.log(chalk.green`\n开始提交代码!\n`)
    shell.exec(` git config --global user.email "1123642601@qq.com" \
        && git config --global user.name "Winfans" \
        && git add . \
        && git commit -m 'feat: update version' -n \
        && git push`)
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

    await writeFile(pkgPath, JSON.stringify(pkg.default, null, 4))

    return version
}

const uploadPackage = () => {
    for (let key in TypeDirNameMap) {
        shell.exec(`cd ${`packages/${TypeDirNameMap[key]}`} && ${publishCmd}`)
    }
}

run()

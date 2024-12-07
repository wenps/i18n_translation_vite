import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import path from 'node:path'
import { fileURLToPath } from 'url'
import dts from 'rollup-plugin-dts'

function resolve(filePath: string) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    return path.resolve(__dirname, filePath)
}

const input = resolve('./src/index.ts')
const loaderInput = resolve('./src/Loader/index.ts')

/**
 * @description: 翻译插件打包
 * @return {*}
 */
const buildConfig = defineConfig({
    input: input,
    output: [
        {
            file: resolve('./dist/index.mjs'),
            format: 'esm'
        },
        {
            file: resolve('./dist/index.cjs'),
            format: 'cjs'
        }
    ],
    plugins: [
        typescript({
            tsconfig: resolve('./tsconfig.json')
        })
    ]
})

/**
 * @description: 翻译自定义loader打包
 * @return {*}
 */
const loaderBuildConfig = defineConfig({
    input: loaderInput,
    output: [
        {
            file: resolve('./dist/Loader/index.mjs'),
            format: 'esm'
        },
        {
            file: resolve('./dist/Loader/index.cjs'),
            format: 'cjs'
        }
    ],
    plugins: [
        typescript({
            tsconfig: resolve('./tsconfig.json')
        })
    ]
})

/**
 * @description: 类型配置
 * @return {*}
 */
const loaderDtsConfig = defineConfig({
    input: loaderInput,
    output: {
        file: resolve('./dist/Loader/index.d.ts'),
        format: 'esm'
    },
    plugins: [
        typescript({
            tsconfig: resolve('./tsconfig.json')
        }),
        dts()
    ]
})

/**
 * @description: 类型配置
 * @return {*}
 */
const dtsConfig = defineConfig({
    input: input,
    output: {
        file: resolve('./dist/index.d.ts'),
        format: 'esm'
    },
    plugins: [
        typescript({
            tsconfig: resolve('./tsconfig.json')
        }),
        dts()
    ]
})

export default [buildConfig, dtsConfig, loaderBuildConfig, loaderDtsConfig]

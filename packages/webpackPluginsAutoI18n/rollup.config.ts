/*
 * @Date: 2025-01-08 11:51:33
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-19 18:01:21
 * @FilePath: /i18n_translation_vite/packages/webpackPluginsAutoI18n/rollup.config.ts
 */
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import path from 'node:path'
import { fileURLToPath } from 'url'
import dts from 'rollup-plugin-dts'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import externals from 'rollup-plugin-node-externals'

function resolve(...filePaths: string[]) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    return path.resolve(__dirname, ...filePaths)
}

const input = resolve('./src/index.ts')
const loaderInput = resolve('./src/customLoader/index.ts')

const buildConfig = defineConfig({
    input: input,
    output: [
        {
            file: resolve('./dist/index.mjs'),
            format: 'esm',
            sourcemap: true // 输出 sourcemap 方便调试
        },
        {
            file: resolve('./dist/index.cjs'),
            format: 'cjs',
            sourcemap: true // 输出 sourcemap 方便调试
        }
    ],
    plugins: [
        externals(), // 自动排除 node_modules 中的依赖
        typescript({
            tsconfig: resolve('./tsconfig.json'), // 使用 tsconfig.json 中的配置
            target: 'ES5' // 兼容低版本 JavaScript
        }),
        babel({
            babelHelpers: 'bundled',
            extensions: ['.js', '.ts'], // 支持 TypeScript 和 JavaScript 文件的转译
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: '> 0.25%, not dead', // 兼容广泛支持的 JavaScript 环境
                        corejs: 3,
                        useBuiltIns: 'entry' // 按需引入 core-js（比如支持 Promise 等新功能）
                    }
                ]
            ]
        }),
        terser() // 压缩输出的代码
    ]
})

const loaderBuildConfig = defineConfig({
    input: loaderInput,
    output: [
        {
            file: resolve('./dist/customLoader/index.mjs'),
            format: 'esm',
            sourcemap: true // 输出 sourcemap 方便调试
        },
        {
            file: resolve('./dist/customLoader/index.cjs'),
            format: 'cjs',
            sourcemap: true // 输出 sourcemap 方便调试
        }
    ],
    plugins: [
        externals(), // 自动排除 node_modules 中的依赖
        typescript({
            tsconfig: resolve('./tsconfig.json'), // 使用 tsconfig.json 中的配置
            target: 'ES5' // 兼容低版本 JavaScript
        }),
        babel({
            babelHelpers: 'bundled',
            extensions: ['.js', '.ts'], // 支持 TypeScript 和 JavaScript 文件的转译
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: '> 0.25%, not dead', // 兼容广泛支持的 JavaScript 环境
                        corejs: 3,
                        useBuiltIns: 'entry' // 按需引入 core-js（比如支持 Promise 等新功能）
                    }
                ]
            ]
        }),
        terser() // 压缩输出的代码
    ]
})

/**
 * @description: 类型配置
 * @return {*}
 */
const loaderDtsConfig = defineConfig({
    input: loaderInput,
    output: {
        file: resolve('./dist/customLoader/index.d.ts'),
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

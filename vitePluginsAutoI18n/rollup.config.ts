import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import path from 'node:path'
import { fileURLToPath } from 'url'
import dts from 'rollup-plugin-dts'
import externals from 'rollup-plugin-node-externals'

function resolve(...filePaths: string[]) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    return path.resolve(__dirname, ...filePaths)
}

const input = resolve('./src/index.ts')

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
    plugins: [typescript(), externals()]
})

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

export default [buildConfig, dtsConfig]

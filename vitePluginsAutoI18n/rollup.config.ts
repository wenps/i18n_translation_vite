import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import path from 'node:path';
import { fileURLToPath } from 'url';
import dts from 'rollup-plugin-dts';
import alias from '@rollup/plugin-alias';
import nodeResolve from '@rollup/plugin-node-resolve';

function resolve(...filePaths: string[]) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, ...filePaths);
}

const input = resolve('./src/index.ts');

const buildConfig = defineConfig({
  input: input,
  output: [
    {
      file: resolve('./dist/index.mjs'),
      format: 'esm',
    },
    {
      file: resolve('./dist/index.cjs'),
      format: 'cjs',
    },
  ],
  plugins: [
    typescript(),
    nodeResolve(),
    alias({
      entries: [
        { find: 'core', replacement: '../autoI18nPluginCore' }
      ]
    }),
  ],
});

const dtsConfig = defineConfig({
  input: input,
  output: {
    file: resolve('./dist/index.d.ts'),
    format: 'esm',
  },
  plugins: [
    typescript({
      tsconfig: resolve('./tsconfig.json'),
    }),
    dts(),
  ],
});

export default [buildConfig, dtsConfig];

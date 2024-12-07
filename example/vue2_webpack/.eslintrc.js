/*
 * @Date: 2024-12-07 15:17:43
 * @LastEditors: xiaoshan
 * @LastEditTime: 2024-12-07 15:28:02
 * @FilePath: /i18n_translation_vite/example/vue2_webpack/.eslintrc.js
 */
module.exports = {
    root: true,
    env: {
        node: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off'
            }
        }
    ]
}

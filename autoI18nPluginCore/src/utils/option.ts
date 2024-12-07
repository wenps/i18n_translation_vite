/*
 * @Author: xiaoshanwen
 * @Date: 2024-02-29 14:44:18
 * @LastEditTime: 2024-03-01 11:42:34
 * @FilePath: /i18n_translation_vite/autoI18nPluginCore/src/utils/option.ts
 */
import { FunctionFactoryOptions } from '../types'

export class FunctionFactoryOption {
    static originLang: string = ''
}

export const functionFactory = (
    fn: (path: string, options: FunctionFactoryOptions) => void,
    options: FunctionFactoryOptions
) => {
    return (path: any) => {
        fn(path, options)
    }
}

/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-18 10:13:36
 * @LastEditTime: 2023-11-18 10:38:39
 * @FilePath: /i18n_translation_vite/vitePluginsAutoI18n/src/constants/language.ts
 */
import { OriginLangKeyEnum } from "../enums";

export const LANGUAGE_SYMBOL_MAP: Record<OriginLangKeyEnum | string, RegExp> = {
    [OriginLangKeyEnum.ZH]: /[\u4e00-\u9fff]/,
    [OriginLangKeyEnum.EN]: /[a-zA-Z]/,
}
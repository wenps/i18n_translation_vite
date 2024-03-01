/*
 * @Author: xiaoshanwen
 * @Date: 2024-02-29 14:44:18
 * @LastEditTime: 2024-03-01 11:43:06
 * @FilePath: /i18n_translation_vite/autoI18nPluginCore/src/constants/language.ts
 */
import { OriginLangKeyEnum } from "../enums";

export const LANGUAGE_SYMBOL_MAP: Record<OriginLangKeyEnum | string, RegExp> = {
    [OriginLangKeyEnum.ZH]: /[\u4e00-\u9fff]/,
    [OriginLangKeyEnum.EN]: /[a-zA-Z]/,
}
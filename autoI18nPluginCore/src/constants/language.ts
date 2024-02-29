import { OriginLangKeyEnum } from "src/enums";

export const LANGUAGE_SYMBOL_MAP: Record<OriginLangKeyEnum | string, RegExp> = {
    [OriginLangKeyEnum.ZH]: /[\u4e00-\u9fff]/,
    [OriginLangKeyEnum.EN]: /[a-zA-Z]/,
}
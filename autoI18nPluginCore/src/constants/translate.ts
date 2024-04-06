import { GoogleOriginLangKeyEnum, YouDaoOriginLangKeyEnum, TranslateApiEnum } from "src/enums"


export const TRANSLATE_LANG_KEY_ENUM_MAP = {
  [TranslateApiEnum.google]: GoogleOriginLangKeyEnum,
  [TranslateApiEnum.youdao]: YouDaoOriginLangKeyEnum,
}
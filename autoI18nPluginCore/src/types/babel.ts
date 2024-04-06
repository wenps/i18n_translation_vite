import { YouDaoOriginLangKeyEnum, GoogleOriginLangKeyEnum } from "../enums";

export type FunctionFactoryOptions = { 
    orignLang: YouDaoOriginLangKeyEnum | GoogleOriginLangKeyEnum | string;
}
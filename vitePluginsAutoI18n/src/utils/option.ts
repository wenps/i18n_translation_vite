import { OriginLangKeyEnum } from "src/enums";
import { FunctionFactoryOptions } from "src/types";

export class FunctionFactoryOption {
    static originLang: string = '';
    static isEn = () => {
      return FunctionFactoryOption.originLang === OriginLangKeyEnum.EN;
    }
}
  
export const functionFactory = (fn: (path: any, options: FunctionFactoryOptions) => void, options: FunctionFactoryOptions) => {
  return (path: any) => {
    fn(path, options);
  };
}
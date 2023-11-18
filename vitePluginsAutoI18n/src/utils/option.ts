import { FunctionFactoryOptions } from "src/types";

export class FunctionFactoryOption {
    static originLang: string = '';
}
  
export const functionFactory = (fn: (path: any, options: FunctionFactoryOptions) => void, options: FunctionFactoryOptions) => {
    return (path: any) => {
      fn(path, options);
    };
}
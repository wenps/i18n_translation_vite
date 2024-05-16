export interface TranslatorOption {
    fetchMethod: (text: string, fromKey: string, toKey: string) => Promise<string>
    name?: string
}

export class Translator {
    protected option: TranslatorOption

    constructor(option: TranslatorOption) {
        this.option = option
    }

    protected getErrorMessage(error: unknown) {
        if (error instanceof Error) {
            return error.message
        } else {
            return String(error)
        }
    }

    async translate(text: string, fromKey: string, toKey: string) {
        // TODO: 后续可以改造成节流
        try {
            return await this.option.fetchMethod(text, fromKey, toKey)
        } catch (error) {
            const name = this.option.name
            console.error(
                `翻译api${name ? `【${name}】` : ''}请求异常：${this.getErrorMessage(error)}`
            )
        }
    }
}

export * from './google'
export * from './youdao'

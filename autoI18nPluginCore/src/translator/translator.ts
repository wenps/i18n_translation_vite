import { throttle } from 'lodash'

export interface TranslatorOption {
    /** 实际的请求方法 */
    fetchMethod: (text: string, fromKey: string, toKey: string) => Promise<string>
    name?: string
    /** 节流间隔（默认不开启） */
    throttle?: number
}

export class Translator {
    protected option: TranslatorOption

    constructor(option: TranslatorOption) {
        this.option = option
        if (this.option.throttle) {
            // FIXME: 需要更换一种节流的实现，这种会有bug
            this.option.fetchMethod = throttle(
                this.option.fetchMethod.bind(this),
                this.option.throttle
            )
        }
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
        let result = ''
        try {
            result = await this.option.fetchMethod(text, fromKey, toKey)
        } catch (error) {
            const name = this.option.name
            console.error(
                `翻译api${name ? `【${name}】` : ''}请求异常：${this.getErrorMessage(error)}`
            )
        }
        return result
    }
}

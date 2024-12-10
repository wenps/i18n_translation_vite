import { translate } from '@vitalets/google-translate-api'
import { Translator } from './translator'
import tunnel from 'tunnel'

export interface GoogleTranslatorOption {
    proxyOption: tunnel.ProxyOptions
}

export class GoogleTranslator extends Translator {
    constructor(option: GoogleTranslatorOption) {
        super({
            name: 'Google翻译',
            fetchMethod: async (text, fromKey, toKey) => {
                let data = await translate(text, {
                    from: fromKey,
                    to: toKey,
                    fetchOptions: {
                        agent: tunnel.httpsOverHttp({
                            proxy: option.proxyOption
                        })
                    }
                })
                return data['text'] || ''
            }
        })
    }
}

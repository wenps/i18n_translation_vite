/*
 * @Author: xiaoshanwen
 * @Date: 2024-04-04 15:12:55
 * @LastEditTime: 2024-04-07 19:33:38
 * @FilePath: /i18n_translation_vite/autoI18nPluginCore/src/utils/translate/api/translateFn.ts
 */

import { TranslateApiEnum } from 'src/enums/index.js'
import { getTranslateKey, truncate } from 'src/utils/base'
import { option } from 'src/option'
const tunnel = require('tunnel')
const { translate } = require('@vitalets/google-translate-api')
const CryptoJS = require('crypto-js')
const axios = require('axios')

/**
 * @description: 调用谷歌翻译API
 * @param {string} text
 * @param {string} fromKey
 * @param {string} toKey
 * @return {*}
 */
const GoogleTranslate = async (text: string, fromKey: string, toKey: string) => {
    let data = await translate(text, {
        from: fromKey,
        to: toKey,
        fetchOptions: {
            agent: tunnel.httpsOverHttp({
                proxy: {
                    port: option.post,
                    host: '127.0.0.1',
                    headers: {
                        'User-Agent': 'Node'
                    }
                }
            })
        }
    }).catch((err: any) => {
        console.error('自动翻译api，请求异常')
        throw new Error(err)
    })
    return data['text'] || ''
}

/**
 * @description: 调用有道翻译API
 * @param {string} text
 * @param {string} fromKey
 * @param {string} toKey
 * @return {*}
 */
const YoudaoTranslate = async (text: string, fromKey: string, toKey: string) => {
    let salt = new Date().getTime()
    let curtime = Math.round(new Date().getTime() / 1000)
    let str = option.youdaoAppId + truncate(text) + salt + curtime + option.youdaoAppKey
    let sign = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex)

    const data = {
        q: text,
        appKey: option.youdaoAppId,
        salt,
        from: getTranslateKey(fromKey),
        to: getTranslateKey(toKey),
        sign,
        signType: 'v3',
        curtime
    }
    return axios
        .post('https://openapi.youdao.com/api', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .then((response: any) => {
            // 请求成功，返回响应数据
            return response.data.translation
        })
        .catch((error: Error) => {
            console.log(error)

            // 请求失败，返回错误信息
            return Promise.reject(error)
        })
}

const TranslateFnMap = {
    [TranslateApiEnum.google]: GoogleTranslate,
    [TranslateApiEnum.youdao]: YoudaoTranslate
}

// 翻译映射map
export default TranslateFnMap

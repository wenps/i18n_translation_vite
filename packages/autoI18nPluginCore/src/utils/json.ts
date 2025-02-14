/**
 * JSON 格式化配置类型
 */
type IndentType = 'tab' | 'space'

interface IndentConfig {
    tab: { char: string; size: number }
    space: { char: string; size: number }
}

interface JSONFormatConfig {
    type: IndentType
    size?: number
}

// 默认的缩进配置
const indentConfig: IndentConfig = {
    tab: { char: '\t', size: 1 },
    space: { char: ' ', size: 4 }
}

// 默认格式化配置
const configDefault: JSONFormatConfig = {
    type: 'tab'
}

// 临时存储替换字符串的数组
let placeholderStorage: string[] = []

// 临时存储处理函数
const pushPlaceholder = (match: string): string => `\\${placeholderStorage.push(match)}\\`
const popPlaceholder = (_match: string, index: string): string => placeholderStorage[+index - 1]

// 生成缩进字符
const generateIndentation = (count: number, indentType: string): string => {
    return new Array(count + 1).join(indentType)
}

/**
 * 格式化 JSON 字符串
 * @param json JSON 字符串
 * @param indentType 缩进类型
 * @returns 格式化的 JSON 字符串
 */
function formatJSON(json: string, indentType: string): string {
    placeholderStorage = []
    let output = ''
    let indentLevel = 0

    // 提取反斜杠和字符串
    json = json
        .replace(/\\./g, pushPlaceholder) // 处理反斜杠
        .replace(/(".*?"|'.*?')/g, pushPlaceholder) // 处理字符串
        .replace(/\s+/g, '') // 去除多余空格

    // 根据 JSON 内容添加换行和缩进
    for (let i = 0; i < json.length; i++) {
        const char = json.charAt(i)

        switch (char) {
            case '{':
            case '[':
                output += char + '\n' + generateIndentation(++indentLevel, indentType)
                break
            case '}':
            case ']':
                output += '\n' + generateIndentation(--indentLevel, indentType) + char
                break
            case ',':
                output += ',\n' + generateIndentation(indentLevel, indentType)
                break
            case ':':
                output += ': '
                break
            default:
                output += char
                break
        }
    }

    // 去除数字数组的空格，并还原反斜杠和字符串
    output = output
        .replace(/\[[\d,\s]+?\]/g, match => match.replace(/\s/g, ''))
        .replace(/\\(\d+)\\/g, popPlaceholder) // 还原填充数据
        .replace(/\\(\d+)\\/g, popPlaceholder) // 再次还原填充数据

    return output
}

/**
 * 格式化 JSON 的主函数
 * @param json 需要格式化的 JSON 对象或字符串
 * @param config 配置选项
 * @returns 格式化后的 JSON 字符串
 */
export function jsonFormatter(
    json: object | string,
    config: JSONFormatConfig = configDefault
): string {
    // 确保输入是 JSON 字符串
    const jsonString = typeof json === 'string' ? json : JSON.stringify(json)

    // 获取缩进配置
    const indent = indentConfig[config.type]
    if (!indent) {
        throw new Error(`Unrecognized indent type: "${config.type}"`)
    }

    // 生成缩进字符
    const indentType = generateIndentation(config.size || indent.size, indent.char)

    // 格式化 JSON 字符串
    return formatJSON(jsonString, indentType)
}

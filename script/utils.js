/** 将命令传参转为对象
 * @returns { Map<string, string> }
*/
const parseArgsToMap = () => {
    const args = new Map()
    
    process.argv.forEach(arg => {
        const [key, value] = arg.split('=')
        if (value) {
            args.set(key, value)
        }
    })
    return args
}

module.exports = {
    parseArgsToMap
}

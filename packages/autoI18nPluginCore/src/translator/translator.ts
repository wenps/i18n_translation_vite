export interface TranslatorOption {
    /** 实际的请求方法 */
    fetchMethod: (text: string, fromKey: string, toKey: string) => Promise<string>
    name?: string
    /** 执行间隔（默认不开启） */
    interval?: number
}

class IntervalQueue<T extends any[], U extends any> {
    private delay: number
    private timeout: number | undefined
    private fn: (...args: T) => U

    /**
     * 间隔执行队列
     * @param fn 执行函数
     * @param delay 执行间隔
     * @param timeout 超时时间
     */
    constructor(fn: (...args: T) => U, delay: number, timeout?: number) {
        this.fn = fn
        this.delay = delay
        this.timeout = timeout
    }

    private queue: {
        args: T
        resolve: (value: Awaited<U>) => void
        reject: (reason?: any) => void
    }[] = []
    execute(...args: T) {
        return new Promise<Awaited<U>>((resolve, reject) => {
            this.queue.push({ args, resolve, reject })
            this.run()
            if (this.timeout) {
                setTimeout(() => {
                    reject(new Error('IntervalQueue timeout'))
                }, this.timeout)
            }
        })
    }

    private async wait(delay = this.delay) {
        await new Promise(resolve => setTimeout(resolve, delay))
    }

    private isRunning = false
    private async run() {
        if (this.isRunning) return
        let item: (typeof this.queue)[number] | undefined
        while ((item = this.queue.shift())) {
            const { args, resolve, reject } = item
            this.isRunning = true
            try {
                resolve(await this.fn(...args))
            } catch (e) {
                reject(e)
            }
            await this.wait()
        }
        this.isRunning = false
    }
}

const interval = <T extends unknown[], U extends unknown>(fn: (...args: T) => U, delay: number) => {
    const queue = new IntervalQueue(fn.bind(null), delay)
    return (...args: T) => {
        return queue.execute(...args)
    }
}

export class Translator {
    protected option: TranslatorOption

    constructor(option: TranslatorOption) {
        this.option = option
        if (this.option.interval) {
            this.option.fetchMethod = interval(this.option.fetchMethod, this.option.interval)
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

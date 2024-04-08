export interface interRouter {
    name: string
    mate: {
        en_name: string
        zh_name: string
        [props: string]: any
    }
    [props: string]: any
}

// src/shims-vue.d.ts

import { k } from 'vite/dist/node/types.d-aGj9QkWt'

// 声明 .vue 文件的类型
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// 扩展 window 对象的类型
interface Window {
    [key: string]: any
}

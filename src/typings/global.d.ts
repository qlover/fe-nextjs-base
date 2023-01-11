declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

type ValueOf<T> = T[keyof T]
type SameString = string | number
type PlainObject<V = any> = { [key: SameString]: V }

// window 扩展
declare interface Window extends Window {}

declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * 本地环境
     */
    readonly NEXT_PUBLIC_APP_ENV?: LocalApp.AppEnv
    readonly NEXT_PUBLIC_SITE_ORIGIN?: string
  }
}

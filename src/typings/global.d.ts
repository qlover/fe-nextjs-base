declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

type ValueOf<T> = T[keyof T]
type SameString = string | number
type PlainObject<V = any> = { [key: SameString]: V }

declare interface Window extends LocalApp.AppScripts.Instance, Window {}

declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * 本地环境
     */
    readonly NEXT_PUBLIC_APP_ENV?: LocalApp.AppEnv
  }
}

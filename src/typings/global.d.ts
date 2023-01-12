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

    /**
     * 站点地址,用于 sitemap siteUrl
     *
     * 比如: http://localhost:3100
     */
    readonly NEXT_PUBLIC_SITE_URL?: string
  }
}

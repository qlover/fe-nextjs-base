declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

type SameString = string | number;

type PlainObject<V = any> = { [key: string]: V };

/**
 * .env 变量字符串
 */
type NextEnvType = 'NEXT_PUBLIC_APP_ENV';

/** 扩展 Window */
declare interface Window extends Window {}

/** 扩展 NodeJS */
declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * 本地环境
     */
    readonly NEXT_PUBLIC_APP_ENV?: LocalApp.AppEnv;

    /**
     * 部署方式
     */
    readonly NEXT_PUBLIC_APP_DEPLOYMENT?: LocalApp.AppDeployment;
  }
}

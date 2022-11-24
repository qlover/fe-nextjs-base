import appConfig from '@/config/appConfig';
import { isBrower } from '@/config/nextEnv';
import { localLoginInfo } from '@/utils/client/createStore';
import { message } from 'antd';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { has } from 'lodash';
import { createRequest } from 'maroonlis-utils';
export const BaseUrl = appConfig.apiBaseHost;
export type ApiRespone<D = any> = {
  code?: number;
  data?: D;
  msg?: string;
  [key: string]: any;
};
const whitAxios = createRequest<
  AxiosRequestConfig,
  AxiosResponse<ApiRespone>
>();

const instace = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export function injectToken(token?: string) {}

whitAxios.useConfig((cfg) => {
  cfg.headers || (cfg.headers = {});

  // 客户端注入 token
  if (isBrower()) {
    const { tokenName, tokenValue } = localLoginInfo().get({});

    if (!cfg.headers[tokenName] && tokenName && tokenValue) {
      cfg.headers[tokenName] = cfg.headers[tokenName] || tokenValue;
    }
  }

  // 注入 language
  // Object.assign(cfg.headers, injectAcceptLanguage());
  if (appConfig.appEnv !== 'master') {
    console.log(`[basicAxios ${cfg.method}] ${cfg.url}`, cfg.headers, cfg.data);
  }

  return cfg;
});
whitAxios.useMocktpl((data) => {
  return {
    status: 200,
    statusText: 'ok',
    headers: {},
    config: {},
    data: {
      code: 200,
      data,
      message: 'ok',
    },
  };
});
whitAxios.useInstaner((cfg) => {
  return instace(cfg).then((res) => {
    if (cfg.filterResponse !== false) {
      const { data } = res;
      if (!isRestfulValue(data)) {
        if (isBrower()) {
          message.error('not api response');
        }
        return Promise.reject(res);
      }

      const { code } = data;
      // 重新登录
      if (code === 1000) {
        if (isBrower()) {
          message.error(data.msg);
        }
        return Promise.reject(res);
      }

      if (code !== 0) {
        if (isBrower()) {
          message.error(data.msg || (code && codeMap[code]) || 'Server Error');
        }

        return Promise.reject(res);
      }
    }

    return res;
  });
});

function isRestfulValue(obj: any): obj is ApiRespone {
  return has(obj, 'code') && has(obj, 'msg');
}
const codeMap: Record<number | string, any> = {
  /**
   * 返回成功
   */
  0: 'ok',
  /**
   * 请先登录
   */
  1000: 'invalid authorization',
  /**
   * 账号已被禁用
   */
  1001: 'user forbidden',
  /**
   * 设备已被禁用
   */
  1002: 'device forbidden',
  /**
   * 无权限访问该内容
   */
  1003: 'permission denied',
  /**
   * 登陆失败
   */
  1004: 'login fail, incorrect information',
  /**
   * 邮箱已注册
   */
  1005: 'email registered',
  /**
   * 请求方式不支持
   */
  2000: 'request method not allowed',
  /**
   * 参数错误
   */
  2001: 'params error',
  /**
   * 超过访问次数
   */
  2010: 'access limit exceeded',
  /**
   * 数据库异常
   */
  3000: 'db error',
  /**
   * 空指针
   */
  3001: 'npe error',
  /**
   * 数据不存在
   */
  3002: 'data not exist',
  /**
   * 调用三方API失败
   */
  4000: 'call api fail',
  /**
   * 支付异常
   */
  4001: 'pay error',
  /**
   * 节点异常
   */
  4010: 'node server error',
  /**
   * 服务器异常
   */
  5000: 'server fail',
};
export default whitAxios.request;

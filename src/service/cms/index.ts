import appConfig from '@/config/appConfig';
import { isBrower } from '@/config/nextEnv';
import CMSRequest from '@/utils/apiTranslator/cms/CMSRequest';
import { concatURL } from '@/utils/client/host';
import { injectAcceptLanguage } from '@/utils/client/locales';
import { message } from 'antd';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { identity } from 'lodash';
import { createRequest } from 'maroonlis-utils';

export const BaseUrl = concatURL(appConfig.apiCMSHost, '/api');

export type CmsResponseType = AxiosResponse<CMS.Response.DataType>;
/**
 * 为 blog 和 support 提供 cms 接口
 */
const cmsAxios = createRequest<AxiosRequestConfig, CmsResponseType>();

const instace = axios.create({ baseURL: BaseUrl, timeout: 60000 });

function stringifyURL(url: string, params: any) {
  if (url.includes('?')) {
    return `${url}&${params}`;
  }
  return `${url}?${params}`;
}

instace.interceptors.response.use(identity, (res) => {
  if (isBrower()) {
    message.error(res.message);
  }

  console.log('[cmsAxios error]', res?.message || res);
});

cmsAxios.useConfig((cfg) => {
  cfg.headers || (cfg.headers = {});
  const params = CMSRequest.create(cfg.params);
  delete cfg.params;

  // 注入 language
  const acceptLang = injectAcceptLanguage();

  // header 增加 locale
  Object.assign(cfg.headers, acceptLang);
  // qs 增加 locale
  params.setLocale(acceptLang['Accept-Language']);

  cfg.url = stringifyURL(cfg.url || '', params.toString());

  if (appConfig.appEnv !== 'master') {
    console.log(`[cmsAxios ${cfg.method}] ${cfg.url}`, cfg.headers, cfg.data);
  }

  return cfg;
});

cmsAxios.useMocktpl((data) => {
  return {
    status: 200,
    statusText: 'ok',
    headers: {},
    config: {},
    data: {
      data,
    },
  };
});

cmsAxios.useInstaner(instace);

export default cmsAxios.request;

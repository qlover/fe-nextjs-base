import { serverLog } from '@/utils/logger';
import i18n from '../../i18n';
import pkg from '../../package.json';
import { isBrower } from './nextEnv';

const env = (val?: string, defaultV = '') => val || defaultV;

let appConfig = {
  versoin: pkg.version,
  /**
   * 当前环境
   *
   * fork:test
   * test
   * master
   * local
   */
  appEnv: env(process.env.NEXT_PUBLIC_APP_ENV) as LocalApp.AppEnv,
  /**
   * 站点域名
   */
  siteURL: env(process.env.NEXT_PUBLIC_SITE_URL),

  /**
   * api 接口地址
   */
  apiBaseHost: env(process.env.NEXT_PUBLIC_API_HOST),
  apiCMSHost: env(process.env.NEXT_PUBLIC_API_HOST),

  /**
   * `locales` 中的本地数据前缀
   */
  localesDataPrefix: 'rv_',

  /**
   * gtag 配置
   */
  gtag: {
    // 衡量 ID
    MeasurementID: 'G-6KRFZ0L7JM',
    // 容器ID
    GTMID: 'GTM-PJ7ZPFB',
    downloadID: 'sv-download',
  },

  /**
   * 默认语言
   */
  lang: i18n.defaultLocale,

  timeFormat: { blogUpdateTime: 'y/m/d' },
  tokenHeaderKey: 'Authorization',
};

if (isBrower()) {
  if (appConfig.appEnv === 'master') {
    serverLog(appConfig.appEnv);
  } else {
    serverLog(appConfig);
  }
}

export default appConfig;

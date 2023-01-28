import pkg from '../../package.json'

const env = (val?: string, defaultV = '') => val || defaultV

let workConfig = {
  versoin: pkg.version,
  /**
   * 当前环境
   *
   * test
   * master
   * local
   */
  appEnv: env(process.env.NEXT_PUBLIC_APP_ENV) as 'local' | 'test' | 'master',

  /**
   * 站点域名
   */
  siteURL: env(process.env.NEXT_PUBLIC_SITE_URL)
}

export default workConfig

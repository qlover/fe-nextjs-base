import workConfig from '@/config/workConfig'

const ServerRendererConfig = {
  /**
   * 是否捕获错误
   */
  catchError: workConfig.appEnv === 'master'
}

export default ServerRendererConfig

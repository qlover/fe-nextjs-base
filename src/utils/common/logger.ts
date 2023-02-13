import workConfig from '@/config/workConfig'
import { logger as mlogger } from 'maroonlis-utils'

export const logger = {
  debug(...args: any[]) {
    workConfig.appEnv !== 'master' && mlogger.debug(...args)
  },

  info(...args: any[]) {
    workConfig.appEnv !== 'master' && mlogger.info(...args)
  },

  warn(...args: any[]) {
    workConfig.appEnv !== 'master' && mlogger.warn(...args)
  },

  error(...args: any[]) {
    workConfig.appEnv !== 'master' && mlogger.error(...args)
  }
}

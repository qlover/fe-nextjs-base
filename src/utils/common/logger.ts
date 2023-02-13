// const CURRENT_LEVEL = 'DEBUG'

import { logger } from 'maroonlis-utils'

// const LEVELS = {
//   ERROR: 1,
//   WARN: 2,
//   INFO: 3,
//   DEBUG: 4
// }

// const print = (level: keyof typeof LEVELS, args: any[]) => {
//   // check log level
//   if (LEVELS[CURRENT_LEVEL] < LEVELS[level]) {
//     return
//   }

//   if (!args || args.length === 0 || !args[0]) {
//     return
//   }

//   // @ts-expect-error
//   console[level.toLocaleLowerCase()](new Date().toLocaleString(), ...args)
// }

const clientLog = {
  debug(...args: any[]) {
    logger.debug('[client]', ...args)
  },

  info(...args: any[]) {
    logger.info('[client]', ...args)
  },

  warn(...args: any[]) {
    logger.warn('[client]', ...args)
  },

  error(...args: any[]) {
    logger.error('[client]', ...args)
  }
}
const serverLog = {
  debug(...args: any[]) {
    logger.debug('[server]', ...args)
  },

  info(...args: any[]) {
    logger.info('[server]', ...args)
  },

  warn(...args: any[]) {
    logger.warn('[server]', ...args)
  },

  error(...args: any[]) {
    logger.error('[server]', ...args)
  }
}

export { clientLog, serverLog }

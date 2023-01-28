const CURRENT_LEVEL = 'DEBUG'

const LEVELS = {
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4
}

const print = (level: keyof typeof LEVELS, args: any[]) => {
  // check log level
  if (LEVELS[CURRENT_LEVEL] < LEVELS[level]) {
    return
  }

  if (!args || args.length === 0 || !args[0]) {
    return
  }

  // @ts-expect-error
  console[level.toLocaleLowerCase()](new Date().toLocaleString(), ...args)
}

const clientLog = {
  debug(...args: any[]) {
    print('DEBUG', ['[client]', ...args])
  },

  info(...args: any[]) {
    print('INFO', ['[client]', ...args])
  },

  warn(...args: any[]) {
    print('WARN', ['[client]', ...args])
  },

  error(...args: any[]) {
    print('ERROR', ['[client]', ...args])
  }
}
const serverLog = {
  debug(...args: any[]) {
    print('DEBUG', ['[server]', ...args])
  },

  info(...args: any[]) {
    print('INFO', ['[server]', ...args])
  },

  warn(...args: any[]) {
    print('WARN', ['[server]', ...args])
  },

  error(...args: any[]) {
    print('ERROR', ['[server]', ...args])
  }
}

export { clientLog, serverLog }

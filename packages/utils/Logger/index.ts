import { Serialize } from '../Serialize';

const REDUNDANT_SYMBOL = 'Z';
const ONE_MINUTE_MS = 60 * 1000;

type LevelType = keyof Pick<
  typeof console,
  'warn' | 'info' | 'debug' | 'error' | 'log'
>;

export function Logger(args?: { level: number }) {
  const { level = 1 } = args || {};

  const print = (method: LevelType, ...args: any[]) => {
    if (level < 1) {
      return;
    }

    if (!args || !args.length) {
      return;
    }

    const prefixstr = LoggerWrapper.prefix(method);
    const cmethod = console[method];

    cmethod && cmethod.apply(console, [prefixstr, ...args]);
  };

  function LoggerWrapper(...args: any[]) {
    LoggerWrapper.info(...args);
  }

  LoggerWrapper.prefix = (level: LevelType) => {
    const now = new Date();
    const timeZoneOffsetMs = now.getTimezoneOffset() * ONE_MINUTE_MS;
    const localTime = new Date(now.getTime() - timeZoneOffsetMs);
    const time = localTime.toISOString().replace(REDUNDANT_SYMBOL, '');
    return `[${time} ${level}]`;
  };

  LoggerWrapper.debug = (...args: any[]) => {
    print('debug', ...args);
  };

  LoggerWrapper.info = (...args: any[]) => {
    print('info', ...args);
  };

  LoggerWrapper.warn = (...args: any[]) => {
    print('warn', ...args);
  };

  LoggerWrapper.error = (...args: any[]) => {
    print('error', ...args);
  };

  LoggerWrapper.toString = (...args: any[]) => {
    args.map((value) => {
      LoggerWrapper.info(Serialize.serialize(value));
    });
  };

  return LoggerWrapper;
}

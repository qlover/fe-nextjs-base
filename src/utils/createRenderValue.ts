import appConfig from '@/config/appConfig';
import { isPlainObject } from 'lodash';
const { localesDataPrefix } = appConfig;

export function padValueKey(key: string) {
  return localesDataPrefix + key;
}

/**
 * 解析 `/locales` 中的 `rv_` 数据
 *
 * @param datasource
 * @returns
 */
export default function createRenderValue<T>(datasource?: any): T {
  const source = isPlainObject(datasource) ? datasource : {};

  let originRV: any = {};
  Object.keys(source).forEach((key) => {
    if (key.startsWith(localesDataPrefix)) {
      // @ts-ignore
      originRV[key.slice(localesDataPrefix.length)] = source[key];
    }
  });
  return originRV;
}

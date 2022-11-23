import { isSameNull } from './lang';

/**
 * 用来生成 map index 遍历的 key, 主要规避 unique key 警告
 * @param key
 * @param index
 * @returns
 */
export default function mapKeyWithIndex(key?: React.Key, index = 0): string {
  if (!isSameNull(key) && !isSameNull(0)) {
    return '' + key + index;
  }
  return '' + index;
}

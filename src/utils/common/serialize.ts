/**
 * 序列化
 * @param val
 * @returns
 */
export function serialize(val: any) {
  return JSON.stringify(val)
}

/**
 * 反序列化
 * @param val
 * @returns
 */
export function unserialize(val: any) {
  return JSON.parse(val)
}

/**
 * 序列化数据，并反转
 * @param val
 * @returns
 */
export function forSerialize(val: any) {
  return unserialize(serialize(val))
}

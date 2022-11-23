/**
 * 该方法主要用来在开发环境或测试环境解决 `SerializableError`
 *
 * @param obj
 * @returns
 */
export function prepareForSerializatoin(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}

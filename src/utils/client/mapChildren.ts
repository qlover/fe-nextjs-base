import { get } from 'lodash'
import { isNotEmptyArray, isSameNull } from 'maroonlis-utils'

export function mapChildren<
  T = any,
  R extends Function = Component.MapRenderComponent<T>
>(options?: T[] | T, render?: R) {
  if (!isNotEmptyArray(options)) {
    return null
  }

  return options.map((item, index) => {
    const key = mapKey(
      (get(item, 'id', get(item, 'key')) as React.Key | undefined) || index,
      index
    )
    return render ? render({ key, item, index }) : null
  })
}

function mapKey(key?: React.Key, index = 0): string {
  if (!isSameNull(key) && !isSameNull(0)) {
    return '' + key + index
  }
  return '' + index
}

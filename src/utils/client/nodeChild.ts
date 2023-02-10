import { get, isFunction, isNil } from 'lodash'
import { isNotEmptyArray } from 'maroonlis-utils'

export function renderWithFuncNode<P = any>(
  node?: Component.WithFuncNode<P>,
  props?: P
) {
  if (isNil(node)) {
    return null
  }
  return isFunction(node) ? node(props || ({} as P)) : node
}

export function mapChildren<
  T = any,
  R extends Function = Component.MapRenderComponent<T>
>(options?: T[] | T, render?: R) {
  if (!isNotEmptyArray(options)) {
    return null
  }

  const length = options.length

  return options.map((item, index) => {
    const key = mapKey(
      (get(item, 'id', get(item, 'key')) as React.Key | undefined) || index,
      index
    )
    return render ? render({ key, item, index, length }) : null
  })
}

export function mapKey(key?: React.Key, index = 0): string {
  if (!isNil(key)) {
    return '' + key + index
  }
  return '' + index
}

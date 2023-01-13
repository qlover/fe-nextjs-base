import { MutableRefObject, useCallback, useRef, useState } from 'react'

type Action<S> = (prevState: S) => S
type StateCommit<S> = (
  state?: Action<S> | Partial<S>,
  staged?: boolean
) => S | void

function isObject(obj: any): obj is Object {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
function update(_new: any, old: any) {
  if (isObject(_new) && isObject(old)) {
    return { ...old, ..._new }
  }
  if (Array.isArray(_new) && Array.isArray(old)) {
    return [...old, ..._new]
  }
  return _new
}

/**
 *
 * 1. 扩展 useState 对象(数组)合并
 *
 * @link https://reactjs.org/docs/hooks-reference.html#usestate 在 React 18 之前，只有 React 事件处理程序内部的更新是批处理的。从 React 18 开始，默认为所有更新启用批处理
 *
 * ```
 * const [pageState, commit, prevState] = useCacheState<TapTapPageState>(() => ({
 *   panel1: {
 *     download: 66666,
 *     follow: 8888,
 *     comment: 66666,
 *   },
 *   panel2: {
 *     positive: 10,
 *     negative: 44,
 *   }
 * }))
 *
 * // 用法一
 * prevState().pandel2.positive = 20
 * commit() // update
 *
 * // 用法2
 * commit((s) => ({...s, panel2:{...s.pandel2, positive:20}})) // update
 *
 * // 用法3
 * commit({ panel1: { ...prevState(), negative:20 } }, true)
 * commit({ panel1: {download: 66666, follow: 8888, comment: 66666} }, true)
 * commit()  // update
 * ```
 *
 * @param initialState
 * @returns [原始状态值, 状态更新方法, 暂存状态值]
 */
export default function useCacheState<S>(
  initialState: S | (() => S)
): [Readonly<S>, StateCommit<S>, MutableRefObject<Readonly<S>>] {
  const [innerState, set_InnerState] = useState<S>(initialState)

  // 未来版本需要，保证不能与 innerState 相等
  const stagedStateRef = useRef<S>(innerState)

  const commit = useCallback<StateCommit<S>>((state, staged) => {
    // 触发更新
    // commit() 更新
    if (state === void 0) {
      !staged &&
        set_InnerState(update(stagedStateRef.current, stagedStateRef.current))
      return
    }

    if (typeof state === 'function') {
      const newState = (state as StateCommit<S>)(stagedStateRef.current)
      stagedStateRef.current = update(newState, stagedStateRef.current)
    } else {
      stagedStateRef.current = update(state, stagedStateRef.current)
    }

    !staged && set_InnerState(stagedStateRef.current)
  }, [])

  const getStaged = () => stagedStateRef.current

  return [innerState, commit, stagedStateRef]
}

import { StoreState } from '@/stores/store'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { identity } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * redux dispatch + selector 组合逻辑
 *
 * ** 只为客户端提供状态，也就是 server 渲染不带状态，从根源防止客户端服务端渲染不一致问题 **
 * @todo 只为客户端提供状态，也就是 server 渲染不带状态，从根源防止客户端服务端渲染不一致问题
 *
 * @param selector
 * @returns
 */
export default function useStores<Selected = StoreState>(
  selector?: (state: StoreState) => Selected
): [Selected | undefined, Dispatch<AnyAction>] {
  const dispatch = useDispatch()
  const state = useSelector(selector || identity)

  const [innerState, setInnerState] = useState<Selected>()

  useEffect(() => {
    setInnerState(state)
  }, [state])

  return [innerState, dispatch]
}

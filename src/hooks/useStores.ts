import { StoreState } from '@/stores/store'
import { identity } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

/**
 * redux dispatch + selector 组合逻辑
 *
 * @param selector
 * @returns
 */
export default function useStores<Selected = StoreState>(
  selector?: (state: StoreState) => Selected
) {
  const dispatch = useDispatch()
  const state = useSelector(selector || identity)
  return { dispatch, state }
}

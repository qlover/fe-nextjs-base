import * as Keys from '@/config/conts'
import { Store } from 'maroonlis-utils'

const innerStore = Store()

const cacheMap: Record<string, ReturnType<typeof innerStore>> = {}

export default function Storage(key: string) {
  const cache = cacheMap[key]
  return cache || (cacheMap[key] = innerStore(key))
}

export const localUserInfo = Storage(Keys.STORAGE_USERINFO)

import { Store } from 'maroonlis-utils';
const localStore = Store();

const keys = ['login_info'] as const;

const cacheMap: Record<string, ReturnType<typeof localStore>> = {};

export default function createStore(key: typeof keys[number]) {
  if (cacheMap[key]) {
    return cacheMap[key];
  }
  return (cacheMap[key] = localStore(key));
}

// 为了兼容 next client 与 server 关系
export const localLoginInfo = () => createStore('login_info');

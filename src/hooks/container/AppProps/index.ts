import useAppProps from '@/hooks/useAppProps'
import { createContainer } from 'unstated-next'

import type { UseAppPropsType } from '@/hooks/useAppProps'

/**
 * 为特殊情况，获取 _app.tsx 组件属性
 *
 * FIXE: md 页面, 不会收到 pageProps
 * 并且改属性只会传递一次,第二次不会传递，
 * 比如: 第一次访问 md 页面没有 pageProps, 第二次返回另一个页面，就会为空 pageProps, 如果此时对 pageProps 有依赖就会出错
 * 暂时解决方案: app 提供一个 getPageProps 方法随时获取最新 pageProps
 *
 *
 * ```
 * // _app.tsx
 * <AppPropsContainer.Provider>
 *  // ...
 * <AppPropsContainer.Provider>
 *
 * // pages/index.tsx
 * const {} = AppPropsContainer.useContainer()
 * ```
 */
const AppPropsContainer = createContainer<
  ReturnType<typeof useAppProps>,
  UseAppPropsType
>(useAppProps)

export default AppPropsContainer

import { UIThemeContext } from '@/components/UITheme/container'
import { storeWrapper } from '@/stores/store'
import { Provider as ReduxProvider } from 'react-redux'
import AppPropsContainer from '../AppProps'

import type { AppProps } from 'next/app'
import type { FC } from 'react'

/**
 * 通用 app 服务提供组件
 *
 * 1. 提供 appProps 属性 context
 * 2. 提供 redux 服务
 * 3. 提供 ui 服务
 *
 * @returns
 */
const AppProvider: FC<
  Component.WithChildren<{
    initialState: AppProps
  }>
> = ({ initialState, children }) => {
  const { Component, pageProps, ...rest } = initialState
  const { store } = storeWrapper.useWrappedStore(rest)

  return (
    <AppPropsContainer.Provider initialState={{ pageProps }}>
      <UIThemeContext>
        <ReduxProvider store={store}>
          {/* component */}
          {children}
        </ReduxProvider>
      </UIThemeContext>
    </AppPropsContainer.Provider>
  )
}

export default AppProvider

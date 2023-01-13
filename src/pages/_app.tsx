import { UIThemeContext } from '@/components/UITheme/container'
import AppPropsContainer from '@/hooks/container/AppProps'
import '@/styles/css/index.css'
import '@/styles/less/index.less'
import { omit } from 'lodash'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as Page.Component).Layout || Fragment

  return (
    <AppPropsContainer.Provider initialState={{ pageProps }}>
      <UIThemeContext>
        <Layout>
          {/* 排除 额外属性 */}
          <Component {...omit(pageProps, ['__lang', '__namespaces'])} />

          {/* <Component {...pageProps} /> */}
        </Layout>
      </UIThemeContext>
    </AppPropsContainer.Provider>
  )
}

import { UIThemeContext } from '@/components/UITheme/container'
import AppPropsContainer from '@/hooks/container/AppProps'
import '@/styles/css/index.css'
import '@/styles/less/index.less'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as Page.Component).Layout || Fragment

  return (
    <AppPropsContainer.Provider initialState={{ pageProps }}>
      <UIThemeContext>
        <Layout>
          <Component />
        </Layout>
      </UIThemeContext>
    </AppPropsContainer.Provider>
  )
}

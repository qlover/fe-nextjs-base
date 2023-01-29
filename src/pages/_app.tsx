import { AppProvider } from '@/components/container'
import '@/styles/css/index.css'
import '@/styles/less/index.less'
import { omit } from 'lodash'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'

export default function App(props: AppProps) {
  const { Component, pageProps, ...rest } = props
  const Layout = (Component as Page.Component).Layout || Fragment

  return (
    <AppProvider initialState={props}>
      <Layout>
        {/* 排除 额外属性 */}
        <Component {...omit(pageProps, ['__lang', '__namespaces'])} />
      </Layout>
    </AppProvider>
  )
}

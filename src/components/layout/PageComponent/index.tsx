import { Fragment } from 'react'
import RootLayout from '../RootLayout'
import TestLayout from '../TestLayout'

export function PageComponent<P>(Component: Page.Component<P>) {
  if (!Component.Layout) {
    Component.Layout = Fragment
  }

  const Layout = Component.Layout

  const InnerPage: Page.Component<P> = (props) => {
    return (
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    )
  }

  return InnerPage
}

export function PageRoot<P>(Component: Page.Component<P>) {
  if (!Component.Layout) {
    Component.Layout = RootLayout
  }

  return PageComponent(Component)
}

export function PageMakerdown<P>(Component: Page.Component<P>) {
  if (!Component.Layout) {
    Component.Layout = RootLayout
  }

  return PageComponent(Component)
}
export function PageTest<P>(Component: Page.Component<P>) {
  if (!Component.Layout) {
    Component.Layout = TestLayout
  }

  return PageComponent(Component)
}

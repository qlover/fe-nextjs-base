import { DefaultMarkdownPage } from '@/components/pages'
import RootLayout from '../RootLayout'
import TestLayout from '../TestLayout'

export function PageComponent<P>(Component: Page.Component<P>) {
  const InnerPage: Page.Component<P> = (props) => {
    if (!Component.Layout) {
      return <Component {...props} />
    }
    return (
      <Component.Layout {...props}>
        <Component {...props} />
      </Component.Layout>
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

export function PageMarkdown<P>(
  Component?: Page.Component<P & Page.MarkdownBaseProps>
) {
  if (Component) {
    return PageComponent(Component)
  }

  return DefaultMarkdownPage
}

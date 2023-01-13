import { FC } from 'react'

type RootLayoutProps = {}

const RootLayout: FC<Component.WithChildren<RootLayoutProps>> = ({
  children
}) => {
  return <div className="RootLayout-wrapper">{children}</div>
}

export default RootLayout

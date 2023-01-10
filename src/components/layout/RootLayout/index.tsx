import { FC } from 'react'

type RootLayoutProps = {}

const RootLayout: FC<Component.WithChildren<RootLayoutProps>> = ({
  children
}) => {
  console.log('RootLayout')

  return <div className="RootLayout-wrapper">{children}</div>
}

export default RootLayout

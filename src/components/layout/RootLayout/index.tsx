import { PageFooter, PageHeader } from '@/components/pages'
import { FC } from 'react'

type RootLayoutProps = {}

const RootLayout: FC<Component.WithChildren<RootLayoutProps>> = ({
  children
}) => {
  return (
    <div className="RootLayout-wrapper">
      <PageHeader />
      <main>{children}</main>
      <PageFooter />
    </div>
  )
}

export default RootLayout

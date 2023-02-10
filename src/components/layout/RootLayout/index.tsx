import { PageFooter, PageHeader } from '@/components/pages'
import { PageHeaderProps } from '@/components/pages/PageHeader'
import PageSeo from '@/components/pages/PageSeo'
import { FC } from 'react'

type RootLayoutProps = {
  headerProps?: PageHeaderProps
} & Component.UI

const RootLayout: FC<Component.WithChildren<RootLayoutProps>> = ({
  headerProps,
  className,
  children
}) => {
  return (
    <div className={className} data-root="RootLayout">
      <PageSeo />

      <PageHeader {...headerProps} />

      <main>{children}</main>

      <PageFooter />
    </div>
  )
}

export default RootLayout

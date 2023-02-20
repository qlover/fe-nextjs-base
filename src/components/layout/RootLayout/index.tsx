import { PageFooter, PageHeader } from '@/components/pages'
import { PageHeaderProps } from '@/components/pages/PageHeader'
import PageSeo, { PageSeoProps } from '@/components/pages/PageSeo'
import { FC } from 'react'

type RootLayoutProps = {
  headerProps?: PageHeaderProps
  seoProps?: PageSeoProps
} & Component.UI

const RootLayout: FC<Component.WithChildren<RootLayoutProps>> = ({
  headerProps,
  className,
  seoProps,
  children
}) => {
  return (
    <div className={className} data-root="RootLayout">
      <PageSeo {...seoProps} />

      <PageHeader {...headerProps} />

      <main>{children}</main>

      <PageFooter />
    </div>
  )
}

export default RootLayout

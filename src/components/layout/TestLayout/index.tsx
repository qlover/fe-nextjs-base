import { PageSeo } from '@/components/pages'
import { FC } from 'react'

type TestLayoutProps = Component.WithChildren<{}>

const TestLayout: FC<TestLayoutProps> = ({ children }) => {
  return (
    <div className="TestLayout-wrapper">
      <PageSeo />
      <main>{children}</main>
    </div>
  )
}

export default TestLayout

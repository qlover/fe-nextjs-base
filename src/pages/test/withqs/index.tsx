import { RootLayout } from '@/components/layout'
import { serialize } from '@/utils/common/serialize'
import { ServerRenderer } from '@/utils/server/ServerRenderer'
import { useRouter } from 'next/router'

type TestWithQSPageProps = {}

export const getStaticProps = ServerRenderer.ssg<TestWithQSPageProps>()

const TestWithQSPage: Page.Component<TestWithQSPageProps> = (props) => {
  const { query } = useRouter()

  return (
    <div>
      <h1 className="text-3xl">TestWithQSPage</h1>

      <div className="my-3 space-x-4">
        <div>QS: {serialize(query)}</div>
      </div>
    </div>
  )
}

TestWithQSPage.Layout = RootLayout

export default TestWithQSPage

import { RootLayout } from '@/components/layout'
import useCacheState from '@/hooks/common/useCacheState'
import { ServerRenderer } from '@/utils/server/ServerRenderer'

type TestEmptyPageProps = {}

export const getStaticProps = ServerRenderer.ssg<TestEmptyPageProps>({
  async handler(context) {
    return {}
  }
})

const TestEmptyPage: Page.Component<TestEmptyPageProps> = (props) => {
  const [innerState, setInnerState, stateRef] = useCacheState({
    download: 66,
    follow: 88,
    comment: 55
  })

  return <div></div>
}

TestEmptyPage.Layout = RootLayout

export default TestEmptyPage

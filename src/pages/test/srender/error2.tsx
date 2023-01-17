import { RootLayout } from '@/components/layout'
import {
  ServerRenderer,
  ServerRendererError
} from '@/utils/server/ServerRenderer'

type TestSRenderErrore2PageProps = {}

export const getServerSideProps =
  ServerRenderer.ssr<TestSRenderErrore2PageProps>({
    async handler(context) {
      throw new ServerRendererError({
        basePath: 'http://localhost:3100',
        pathname: '/500'
      })
    }
  })

const TestSRenderErrore2Page: Page.Component<TestSRenderErrore2PageProps> = (
  props
) => {
  return (
    <div>
      <h1>TestSRenderErrore2Page</h1>
    </div>
  )
}

TestSRenderErrore2Page.Layout = RootLayout

export default TestSRenderErrore2Page

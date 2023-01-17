import { RootLayout } from '@/components/layout'
import {
  ServerRenderer,
  ServerRendererError
} from '@/utils/server/ServerRenderer'

type TestSRenderError1PageProps = {}

export const getStaticProps = ServerRenderer.ssg<TestSRenderError1PageProps>({
  async handler(context) {
    throw new ServerRendererError({
      pathname: '/404'
    })
  }
})

const TestSRenderError1Page: Page.Component<TestSRenderError1PageProps> = (
  props
) => {
  return (
    <div>
      <h1>TestSRenderError1Page</h1>
    </div>
  )
}

TestSRenderError1Page.Layout = RootLayout

export default TestSRenderError1Page

import { RootLayout } from '@/components/layout'
import {
  ServerRenderer,
  ServerRendererError
} from '@/utils/server/ServerRenderer'
import { random } from 'lodash'

type TestSRenderPageProps = {}

export const getServerSideProps = ServerRenderer.ssr<TestSRenderPageProps>({
  async handler(context) {
    if (random(0, 1)) {
      throw new ServerRendererError({
        pathname: '/test',
        locale: context.locale as I18n.Locale
      })
    }

    return {
      props: {
        name: 'TestSRenderPageProps'
      }
    }
  }
})

const TestSRenderPage: Page.Component<TestSRenderPageProps> = (props) => {
  return (
    <div>
      <h1>TestSRenderPageProps</h1>
    </div>
  )
}

TestSRenderPage.Layout = RootLayout

export default TestSRenderPage

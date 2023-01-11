import { A } from '@/components/common'
import ServerRenderer from '@/utils/server/ServerRenderer'

export const getStaticProps = ServerRenderer.ssg()

const TestDir1Page: Page.Component = (props) => {
  // const { pageProps } = AppPropsContainer.useContainer()
  return (
    <div>
      <h1 className="text-3xl">/testDir/dir1</h1>
      {/* {JSON.stringify(pageProps())} */}
      <A padOrigin pathname="/test/appProps">
        /test/appProps
      </A>
    </div>
  )
}

export default TestDir1Page

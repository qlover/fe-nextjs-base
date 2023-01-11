import ServerRenderer from '@/utils/server/ServerRenderer'
import Link from 'next/link'

export const getStaticProps = ServerRenderer.ssg({})

const TestAppPropsPage: Page.Component = (props) => {
  // const { pageProps } = AppPropsContainer.useContainer()
  return (
    <div>
      <h1 className="text-3xl">test/appProps</h1>
      {/* {JSON.stringify(pageProps())} */}
      <Link className="text-lg text-green-300" href="/">
        to root
      </Link>

      <Link className="text-lg text-green-300" href="/">
        <span>to wrapper</span>
        <span> root</span>
      </Link>
    </div>
  )
}

export default TestAppPropsPage

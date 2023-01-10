import ServerRenderer from '@/utils/server/ServerRenderer'

export const getStaticProps = ServerRenderer.ssg({})

const TestAppPropsPage: Page.Component = (props) => {
  // const { pageProps } = AppPropsContainer.useContainer()
  return (
    <div>
      <h1 className="text-3xl">test/appProps</h1>
      {/* {JSON.stringify(pageProps())} */}
    </div>
  )
}

export default TestAppPropsPage

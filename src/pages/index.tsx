import { A } from '@/components/common'
import { RootLayout } from '@/components/layout'
import { Button } from '@/components/UITheme'
import { useUITheme } from '@/hooks/useUITheme'
import ServerRenderer from '@/utils/server/ServerRenderer'

export const getStaticProps = ServerRenderer.ssg()

const IndexPage: Page.Component = (props) => {
  console.log('props', props)

  const { theme, setTheme } = useUITheme()
  console.log('IndexPage')

  return (
    <>
      <h1>Index Page</h1>
      <Button>Button component</Button>
      <div>The current theme is: {theme}</div>
      <button onClick={() => setTheme('system')}>system Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>

      <div className="my-3">
        <A
          href="/test"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test
        </A>
      </div>
    </>
  )
}

IndexPage.Layout = RootLayout

export default IndexPage

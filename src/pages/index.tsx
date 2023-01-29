import { A } from '@/components/common'
import { RootLayout } from '@/components/layout'
import { Button } from '@/components/UITheme'
import useStores from '@/hooks/useStores'
import { useUITheme } from '@/hooks/useUITheme'
import { selectAuthUser } from '@/stores/slice'
import { ServerRenderer } from '@/utils/server/ServerRenderer'

export const getStaticProps = ServerRenderer.ssg()

const IndexPage: Page.Component = (props) => {
  const { theme, setTheme } = useUITheme()
  const [state] = useStores(selectAuthUser)

  return (
    <>
      <h1>Index Page</h1>

      <div className="h-5">
        current user:{' '}
        <span className="text-red-400 font-bold">{state?.name}</span>
      </div>
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

import { RootLayout } from '@/components/layout'
import { Button } from '@/components/UITheme'
import { useUITheme } from '@/hooks/useUITheme'
import ServerRenderer from '@/utils/server/ServerRenderer'

const slugList = [
  'test_slug1',
  'test_slug2',
  'test_slug3',
  'test_slug4',
  'test_slug5'
]

export const getStaticPaths = ServerRenderer.getStaticPaths({
  async handler(context) {
    return {
      paths: slugList.map((item) => ({
        params: { slug: item }
      })),
      fallback: 'blocking'
    }
  }
})

export const getStaticProps = ServerRenderer.ssg({
  async handler(context) {
    return {
      props: context.params
    }
  }
})

const TestSlugPage: Page.Component = (props) => {
  const { theme, setTheme } = useUITheme()

  return (
    <>
      <h1>Index Page</h1>
      <Button>Button component</Button>
      <div>The current theme is: {theme}</div>
      <button onClick={() => setTheme('system')}>system Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </>
  )
}

TestSlugPage.Layout = RootLayout

export default TestSlugPage

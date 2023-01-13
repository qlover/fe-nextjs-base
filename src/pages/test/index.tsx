import { A } from '@/components/common'
import { createRedirect } from '@/utils/common/Redirect'
import ServerRenderer from '@/utils/server/ServerRenderer'
import { useRouter } from 'next/router'

export const getStaticProps = ServerRenderer.ssg({})

const TestAppPropsPage: Page.Component = (props) => {
  const router = useRouter()

  return (
    <div>
      <h1 className="text-3xl">Test Page</h1>

      <div className="my-3 space-x-4">
        <h2 className="text-2xl">component A</h2>
        <A
          path="/test/withqs"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/withqs
        </A>

        <A
          href={{
            pathname: '/test/withqs',
            query: router.query
          }}
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/withqs
        </A>

        <A
          href={
            createRedirect({
              pathname: '/test/withqs',
              query: { name: 'lis2', name2: 'maron2' }
            }).destination
          }
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/withqs
        </A>

        <A
          href={{
            pathname: '/test/withqs'
          }}
          withQS
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/withqs withQS
        </A>

        <A
          href="/test/dynamic/test_slug1"
          withQS
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/dynamic/test_slug1
        </A>

        <A
          href="/test/dynamic/test_slug1"
          locale="en"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/dynamic/test_slug1 with zh
        </A>
        <A
          path="/test/cacheState"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/cacheState
        </A>
      </div>
    </div>
  )
}

export default TestAppPropsPage

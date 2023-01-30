import { A } from '@/components/common'
import { TestLayout } from '@/components/layout'
import useI18n from '@/hooks/useI18n'
import { createRedirect } from '@/utils/common/Redirect'
import { ServerRenderer } from '@/utils/server/ServerRenderer'

export const getStaticProps = ServerRenderer.ssg({})

const TestAppPropsPage: Page.Component = (props) => {
  const { t, router } = useI18n()

  return (
    <div>
      <h1 className="text-3xl">{t('test_pagetitle')}</h1>

      <div className="my-3 space-x-4">
        <A
          path="/test/store"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/store
        </A>
        <A
          path="/test/storage"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/storage
        </A>
        <A
          path="/test/service"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/service
        </A>
      </div>

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

      <div className="my-3 space-x-4">
        <h2 className="text-2xl">Links</h2>

        <A
          path="/test/srender"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/srender
        </A>
        <A
          path="/test/srender/error1"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/srender/error1
        </A>
        <A
          path="/test/srender/error2"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /test/srender/error2
        </A>
      </div>
    </div>
  )
}

TestAppPropsPage.Layout = TestLayout

export default TestAppPropsPage

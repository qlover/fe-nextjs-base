import { RootLayout } from '@/components/layout'
import { ServerRenderer } from '@/utils/server/ServerRenderer'

const slugList = ['test_slug']

type TestSlugPageProps = {
  slug?: string
}

export const getStaticPaths = ServerRenderer.path<TestSlugPageProps>({
  /**
   * 当静态生成时会生成保证生 /zh 和 /en
   *
   * /en/test/dynamic/test_slug
   * /zh/test/dynamic/test_slug
   *
   * @target static:redirect
   */
  locales: true,
  async handler(context) {
    return {
      paths: slugList.map((item) => ({
        params: { slug: item }
      })),
      fallback: 'blocking'
    }
  }
})

export const getStaticProps = ServerRenderer.ssg<TestSlugPageProps>({
  async handler(context) {
    return {
      slug: context.params?.slug as string
    }
  }
})

/**
 * 禁止 zh 站点访问
 *
 * 1. 站内 a 标签做过滤，去掉跳转 /test/dynamic/[slug] locales 为 zh 的连接
 * 2. next 服务端重定向 /zh/test/dynamic/[slug] -> /test/dynamic/[slug]
 *
 * 保证静态生成时包含 /zh 和 /en 页面
 *
 * @target static:redirect
 *
 * @param props
 * @returns
 */
const TestSlugPage: Page.Component<TestSlugPageProps> = (props) => {
  return (
    <div>
      <h1 className="text-3xl">Test Dynmic [slug]</h1>

      <div className="my-3 space-x-4">
        <div className="text-3xl text-red-300">Only en</div>
        slug is: <span className="text-base font-bold"> {props?.slug}</span>
      </div>
    </div>
  )
}

TestSlugPage.Layout = RootLayout

export default TestSlugPage

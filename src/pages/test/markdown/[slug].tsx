import { PageRoot } from '@/components/layout'
import { logger } from '@/utils/common'
import parseMDX from '@/utils/server/mdxParser'
import {
  ServerRenderer,
  ServerRendererError
} from '@/utils/server/ServerRenderer'
import { find, map } from 'lodash'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import mdJson from 'work/sources/mdJson/posts.json'

type Props = {
  postValue: any
  mdxContent: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >
}

export const getStaticPaths = ServerRenderer.getStaticPaths({
  async handler() {
    const slugList = map(mdJson, 'data.slug')
    const paths = slugList.map((item) => {
      return {
        params: { slug: item }
      }
    })

    return {
      paths: paths,
      fallback: 'blocking'
    }
  }
})
export const getStaticProps = ServerRenderer.ssg<Props>({
  async handler({ params, locale }) {
    const { slug } = params || {}

    const postValue = find(mdJson, ['data.slug', slug])

    if (!postValue) {
      throw new ServerRendererError({
        pathname: '/404',
        locale: locale as I18n.Locale
      })
    }

    const mdxContent = await parseMDX(postValue?.content)

    return {
      props: {
        postValue,
        mdxContent
      }
    }
  }
})

export default PageRoot<Props>(({ postValue, mdxContent }) => {
  logger.info('postValue', postValue)
  logger.info('mdxContent', mdxContent)
  return (
    <div>
      <div className="my-5 max-w-5xl mx-auto">
        <MDXRemote {...mdxContent} lazy />
      </div>
    </div>
  )
})

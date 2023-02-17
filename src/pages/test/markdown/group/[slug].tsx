import { PageMarkdown } from '@/components/layout'
import { ServerRenderer } from '@/utils/server'
import { MarkdownGroup } from '@/utils/server/MarkdownGroup'

export const getStaticPaths = ServerRenderer.path({
  async handler(context) {
    const paths = await new MarkdownGroup('posts').getStaticPaths(context, {
      outputKey: 'slug',
      inputKey: 'data.slug'
    })

    return {
      paths,
      fallback: 'blocking'
    }
  }
})

export const getStaticProps = ServerRenderer.ssg<Page.MarkdownBaseProps>({
  catchError: false,
  async handler(context) {
    const markdownGroup = new MarkdownGroup('posts')
    const markdown = await markdownGroup.getStaticProps(context, {
      outputKey: 'slug',
      inputKey: 'data.slug'
    })
    return { markdown }
  }
})

export default PageMarkdown()

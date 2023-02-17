import { PageMarkdown } from '@/components/layout'
import { ServerRenderer } from '@/utils/server'
import { MarkdownSingle } from '@/utils/server/MarkdownGroup'

export const getStaticProps = ServerRenderer.ssg<Page.MarkdownBaseProps>({
  catchError: true,
  async handler(context) {
    const markdownSingle = new MarkdownSingle('privacy-policy')
    const markdown = await markdownSingle.getStaticProps(context)

    return { markdown }
  }
})

export default PageMarkdown()

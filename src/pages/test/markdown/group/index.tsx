import { A } from '@/components/common'
import { PageComponent } from '@/components/layout'
import { mapChildren } from '@/utils/client'
import { ServerRenderer } from '@/utils/server'
import { MarkdownGroup } from '@/utils/server/MarkdownGroup'

type Props = {
  markdowns: any[]
}
export const getStaticProps = ServerRenderer.ssg<Props>({
  catchError: true,
  async handler(context) {
    const markdownGroup = new MarkdownGroup('posts')
    const markdowns = markdownGroup.getAllMarkdowns()
    return { markdowns }
  }
})

export default PageComponent<Props>(({ markdowns }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {mapChildren(markdowns, ({ key, item }) => (
        <A
          className=" hover:underline hover:text-blue-300"
          key={key}
          href={'/test/markdown/group/' + item.data.slug}
        >
          {item.data.title}
        </A>
      ))}
    </div>
  )
})

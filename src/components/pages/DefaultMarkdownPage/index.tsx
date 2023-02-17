import { RootLayout } from '@/components/layout'
import { MDXRemote } from 'next-mdx-remote'
import { FC } from 'react'
import PageSeo from '../PageSeo'

/**
 * 为 `pageMarkdown` 提供默认组件
 * @param param0
 * @returns
 */
const DefaultMarkdown: FC<Page.MarkdownBaseProps> = ({ markdown }) => {
  const { mdxContext, meta } = markdown

  return (
    <RootLayout key={markdown.uid}>
      <PageSeo
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
      />

      <article className="default-markdown-section">
        <MDXRemote {...mdxContext} />
      </article>
    </RootLayout>
  )
}

export default DefaultMarkdown

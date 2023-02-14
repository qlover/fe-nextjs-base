import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

/**
 * mdx 内容解析，返回数据用于 `<MDXRemote />`  组件渲染
 * @param content
 * @returns
 */
const parseMDX = async (content: string) => {
  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkGfm]
    }
  }
  return await serialize(content, options)
}

export default parseMDX

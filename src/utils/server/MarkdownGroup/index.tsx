import { logger } from '@/utils/common'
import { randomUUID } from 'crypto'
import { readdirSync, statSync } from 'fs'
import { find, get } from 'lodash'
import { GetStaticPathsContext, GetStaticPropsContext } from 'next'
import { join } from 'path'
import { markdownSourcePath } from 'work/config/path.config'

import { readMDFileSync } from 'work/lib/markdown'
import parseMDX from '../mdxParser'
import { ServerRendererError } from '../ServerRendererError'

export class MarkdownCore {
  ROOT_PATH = markdownSourcePath

  /**
   * 导入单个 `.md` 文件
   * @param path
   * @returns
   */
  import(path: string) {
    return readMDFileSync(this.realPath(path))
  }

  /**
   * 导入一个目录下的 `.md` 文件
   */
  importGroup(groupName: string) {
    const dirRoot = this.realPath(groupName)
    if (statSync(dirRoot).isDirectory()) {
      const files = readdirSync(dirRoot)
      return files.map((filename) => {
        return this.import(join(groupName, filename))
      })
    }

    return []
  }

  realPath(path: string) {
    return join(this.ROOT_PATH, path)
  }

  /**
   * 校正 .md 文件名
   * @param name
   * @returns
   */
  correctFilename(name: string) {
    name = name.trim()

    if (name.slice(-3) == '.md') {
      return name
    }
    return name + '.md'
  }

  /**
   * 获取单个 `.md` 文件内容
   * @param filename 文件名
   * @returns
   */
  getContentByFileName(filename: string) {
    return this.import(this.correctFilename(filename))
  }
}

/**
 * 获取一单个 `.md` 文件内容
 */
export class MarkdownSingle extends MarkdownCore {
  filename: string
  /**
   * 因为目前只支持 `.md` 文档, filename `.md` 可省略
   * @param filename
   */
  constructor(filename?: string) {
    super()
    this.filename = filename || ''
  }

  getSingleMarkdown() {
    if (!this.filename) {
      throw new Error('MarkdownSingleEmptyFilenameError')
    }
    return this.getContentByFileName(this.filename)
  }

  /**
   * 获取渲染组件属性
   * @returns
   */
  async getStaticProps(ctx: GetStaticPropsContext) {
    const markdown = this.getSingleMarkdown()
    return await this.getMarkdownBaseProps(ctx, markdown)
  }
  async getMarkdownBaseProps(ctx: GetStaticPropsContext, markdown: any) {
    const { content, data } = markdown
    try {
      return {
        uid: randomUUID(),
        mdxContext: await parseMDX(content),
        content: content,
        meta: data
      } as Page.MarkdownBaseProps['markdown']
    } catch (e) {
      logger.error('[MarkdownSingle]', e)

      throw new ServerRendererError({
        pathname: '/404',
        locale: ctx.locale as I18n.Locale
      })
    }
  }
}

/**
 * 获取一个文件夹内的 `.md` 内容
 *
 */
export class MarkdownGroup extends MarkdownCore {
  groupName: string
  static cacheMarkdownsMap: any = {}

  /**
   * 因为获取的是一组，那么保证该文件目录下都是只有 `.md` 文件，不包含其他内容
   * @param groupName
   */
  constructor(groupName?: string) {
    super()
    this.groupName = groupName || ''
  }

  async getStaticPaths(
    ctx: GetStaticPathsContext,
    fileds: {
      outputKey: string
      inputKey: any
    }
  ) {
    const markdowns = this.getAllMarkdowns()
    const { outputKey, inputKey } = fileds
    return markdowns.map((item) => {
      return {
        params: { [outputKey]: get(item, inputKey) }
      }
    })
  }

  /**
   * 获取所有 `.md` 内容
   * @returns
   */
  getAllMarkdowns(): any[] {
    const { groupName } = this
    if (!groupName) {
      throw new Error('MarkdownGroupEmptyGroupname')
    }

    let cache = MarkdownGroup.cacheMarkdownsMap[groupName]
    if (!cache) {
      cache = this.importGroup(groupName)
      MarkdownGroup.cacheMarkdownsMap[groupName] = cache
    }

    return cache
  }
  /**
   * 获取渲染组件属性
   * @returns
   */
  async getStaticProps(
    ctx: GetStaticPropsContext,
    fields: {
      outputKey: string
      inputKey: any
    }
  ) {
    const { outputKey, inputKey } = fields
    const slug = get(ctx, ['params', outputKey])
    if (!slug) {
      throw new ServerRendererError({
        pathname: '/404',
        locale: ctx.locale as I18n.Locale
      })
    }

    const markdown = find(this.getAllMarkdowns(), [inputKey, slug])
    return new MarkdownSingle().getMarkdownBaseProps(ctx, markdown)
  }
}

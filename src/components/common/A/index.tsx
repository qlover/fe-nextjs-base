import { isEmptyPropsValue } from 'maroonlis-utils'
import Link, { LinkProps } from 'next/link'
import { forwardRef, useMemo } from 'react'

type AProps = Omit<LinkProps, 'href' | 'locale'> & {
  locale?: I18n.Locale

  /**
   * 是否填充主机域名, 只当 href 为 string 时有效, 主机来源 `process.env.NEXT_PUBLIC_SITE_ORIGIN`
   *
   * 对于 seo 比较友好
   *
   * @todo
   */
  padOrigin?: boolean

  /**
   * 用于可选 href, 并提供 `/pages` 目录页面路径类型, 由脚本 `genPageRouter` 生成
   *
   * 可被 href 覆盖
   */
  pathname?: PageRoute.Path

  href?: LinkProps['href']
}

/**
 *
 * 1. 重写 href
 * 2. 定义 locale 类型
 *
 * nextjs13 以下版本 `Link` 组件会存在问题 `https://nextjs.org/docs/messages/link-multiple-children`
 *
 * @param param0
 * @returns
 */
const A = forwardRef<HTMLAnchorElement, Component.WithChildren<AProps>>(
  (props, ref) => {
    const { href, padOrigin, pathname, ...originProps } = props

    const innerHref = useMemo(() => {
      const dhref = isEmptyPropsValue(href) ? pathname || '#' : href

      if (padOrigin) {
        // TODO:
        // return
      }

      return dhref
    }, [href, padOrigin, pathname])

    return (
      <Link {...originProps} ref={ref} href={innerHref}>
        {props.children}
      </Link>
    )
  }
)

A.displayName = 'A'

export default A

import useAElement from '@/hooks/useAElement'
import Link, { LinkProps } from 'next/link'
import { forwardRef } from 'react'

export type AProps = Partial<Omit<LinkProps, 'locale'>> &
  Component.UI<{
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
     * 用于可选 href, 并提供 `/pages` 目录页面路径类型
     *
     * 由脚本 `genPageRouter` 生成
     *
     * 可被 href 覆盖
     *
     */
    path?: PageRoute.Path

    /**
     * 是否携带地址栏参数, 默认为 true
     *
     * 该参数效果可以被 href 为对象时覆盖
     *
     * 暂时不能用在 ssr, 因为地址栏参数存在客户端
     */
    withQS?: boolean
  }>

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
    const originProps = useAElement(props)
    return (
      <Link {...originProps} ref={ref}>
        {props.children}
      </Link>
    )
  }
)

A.displayName = 'A'

export default A

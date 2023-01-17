import { concatPath, padPathnameQS } from 'maroonlis-utils'
import { ParsedUrlQuery } from 'querystring'
import {
  dropDefaultLocale,
  isDefaultLocale,
  isLocalStartPathname
} from '../i18n'

type DestinationProps = {
  /**
   * 语言环境，默认不带
   */
  locale?: I18n.Locale

  /**
   * 重定向目的地址, 对应 `destination`
   *
   * 如果以默认 locale 开头会自动去掉
   *
   * 只支持短路径，不支持全路径, 如 `/test` `/test2`, 不支持 `localhost:3100/test` `localhost:3100/test2`
   */
  pathname: string

  query?: LisNS.PlainObject | ParsedUrlQuery

  /**
   * 为 false 时 next.config.js basePath
   * 字符串时，路径前缀，可支持全路径
   */
  basePath?: false | string
}

export type RedirectProps = DestinationProps & {
  /**
   * 状态码
   */
  statusCode?: 301 | 302 | 303 | 307 | 308

  permanent?: boolean
}

/**
 * 创建一个重定向参数对象
 *
 * 主要用于 next ServerRenderer 重定向参数
 *
 * ssr
 * ```
 * { redirect: Redirect } | { notFound: true }
 * ```
 * ssg
 *
 * ```
 * { redirect: Redirect; revalidate?: number | boolean } | { notFound: true; revalidate?: number | boolean }
 * ```
 *
 * @example
 * ```
 * const redirect = createRedirect({
 *  pathname: "/test",
 *  locale: 'zh',
 *  query: { name: 'lis' },
 * })
 *
 * // { destination: '/zh/test?name=lis', ... }
 * ```
 *
 *
 * @param props
 * @returns
 */
export function createRedirect(props: RedirectProps) {
  let { pathname, query, locale, statusCode = 302, permanent, basePath } = props

  if (!pathname) {
    throw new Error('not pathname')
  }

  if (typeof permanent === 'boolean') {
    return {
      permanent: permanent,
      destination: genDestination({ pathname, query, locale, basePath }),
      basePath: typeof basePath == 'boolean' ? basePath : undefined
    }
  }

  const destination = genDestination({ pathname, query, locale, basePath })

  return {
    statusCode: statusCode,
    destination: destination,
    basePath: typeof basePath == 'boolean' ? basePath : undefined
  }
}

/**
 * 生成 pathname
 * @param props
 * @returns
 */
export function genDestination(props: DestinationProps) {
  const { basePath, pathname = '/', locale, query } = props

  let destination: string = pathname

  // 添加国际化
  if (locale && !isLocalStartPathname(pathname)) {
    if (!isDefaultLocale(locale)) {
      destination = concatPath(concatPath('/', locale), pathname)
    }
  }

  // 去掉 默认 语言开头
  destination = dropDefaultLocale(destination)

  // 增加参数
  if (query) {
    destination = padPathnameQS(destination, query)
  }

  // 添加前缀
  if (typeof basePath === 'string') {
    destination = concatPath(basePath, destination)
  }

  return destination
}

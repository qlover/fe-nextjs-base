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
   */
  pathname?: string

  query?: LisNS.PlainObject | ParsedUrlQuery
}

type RedirectProps = DestinationProps & {
  /**
   * 状态码
   */
  statusCode?: 404 | 301 | 302 | 303 | 307 | 308

  permanent?: boolean

  basePath?: false
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
      destination: genDestination({ pathname, query, locale }),
      basePath: basePath
    }
  }

  // 404
  if (statusCode === 404) {
    pathname = '/404'
  }

  const destination = genDestination({ pathname, query, locale })

  return {
    statusCode: statusCode === 404 ? 302 : statusCode,
    destination: destination,
    basePath: basePath
  }
}

/**
 * 生成 pathname
 * @param props
 * @returns
 */
export function genDestination(props: DestinationProps) {
  const { pathname = '/', locale, query } = props

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

  return destination
}

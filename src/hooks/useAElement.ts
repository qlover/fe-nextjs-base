import type { AProps } from '@/components/common/A'
import type { LinkProps } from 'next/link'

import { PRE_A_HREF } from '@/config/conts'
import { isEmpty, isString } from 'lodash'
import { isEmptyPropsValue, padPathnameQS, toQSParams } from 'maroonlis-utils'
import { useEffect, useState } from 'react'

type Url = LinkProps['href']

function preHref(path?: string, href?: AProps['href']) {
  return isEmptyPropsValue(href) ? path || PRE_A_HREF : href
}

/**
 * 用服务端重定向过滤客户端链接
 *
 * @todo
 * @param href
 */
function filterByRewritesRedirects(href: Url) {
  // if (isString(href) && href !== PRE_A_HREF) {
  // ...
  // }
  return href
}

/**
 * a 元素逻辑
 *
 * 1. 定义 path 类型
 * 2. 和服务端自定义重写同步
 *
 * @param props
 */
export default function useAElement(props?: AProps) {
  const { href, padOrigin, path, withQS, ...originProps } = props || {}

  const [innerHref, setInnerHref] = useState<Url>(() => {
    return filterByRewritesRedirects(preHref(path, href))
  })

  useEffect(() => {
    let dhref = preHref(path, href)

    if (withQS) {
      // 默认浏览器参数
      const locationQS = toQSParams(location.search.slice(1))
      if (!isEmpty(locationQS)) {
        if (isString(dhref)) {
          dhref = padPathnameQS(dhref, locationQS)
        } else {
          dhref.query = Object.assign(dhref.query || {}, locationQS)
        }
      }
    }

    setInnerHref(filterByRewritesRedirects(dhref))
  }, [href, padOrigin, path])

  return { ...originProps, href: innerHref }
}

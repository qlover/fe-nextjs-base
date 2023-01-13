import { getPageLocales } from '@/utils/common/i18n'
import { isArray } from 'lodash'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

/**
 * router + 默认 i18nNS
 *
 * @returns
 */
export default function usePageRouter() {
  const router = useRouter()

  const pageLocale = useMemo(() => {
    const locals = getPageLocales(router.pathname)

    if (isArray(locals) && locals.length) {
      return locals[0]
    }

    return 'common'
  }, [router.pathname])

  return {
    router,
    /**
     * 当前页面 pathname 对应的 locale 字符串
     */
    pageLocale: pageLocale
  }
}
